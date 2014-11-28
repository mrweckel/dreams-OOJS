var GoogleAuth = {}

  GoogleAuth.Keys = {
    client_id: '340894032158-a7ro9gvu0cm86sotbepj9pei5sgi1nk9.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube']
  }

  GoogleAuth.View = {}


  GoogleAuth.Controller = {
    receiveMessage: function(event){
      if (event.origin !== "https://accounts.google.com") return;
    },

    checkAuth: function() {
      gapi.auth.authorize({
        client_id: GoogleAuth.Keys.client_id,
        scope: GoogleAuth.Keys.scopes,
        immediate: false },
        GoogleAuth.Controller.handleAuthResult;
      },


  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        GoogleAuth.View.authSuccess();
        console.log(authResult);
        GoogleAuth.Controller.loadAPIClientInterfaces();

      // $.ajax{
      //   type:"POST",
      //   url: url,
      //   data: authResult,
      //   dataType:'JSON'
      // }


    } else {
      // Auth was unsuccessful. Show things related to prompting for auth
      // and hide the things that should be visible after auth succeeds.
      GoogleAuth.View.authFail();

      // Make the #login-link clickable. Attempt a non-immediate OAuth 2 client
      // flow. The current function will be called when that flow completes.
      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: GoogleAuth.Keys.client_id,
          scope: GoogleAuth.Keys.scopes,
          immediate: false
          }, GoogleAuth.Controller.handleAuthResult);
        });
      }
    }
  }

  // Helper method to display a message on the page.
  GoogleAuth.View = {
    authSuccess: function(){
      $('.pre-auth').hide();
      $('.post-auth').show();
    },

    authFail: function(){
      $('.post-auth').hide();
      $('.pre-auth').show();
    },

    displayMessage: function(message) {
      $('#message').text(message).show();
    },

  // Helper method to hide a previously displayed message on the page.
    hideMessage: function() {
      $('#message').hide();
    }
}

$(document).ready(function(){
      $(".login").on("click","a#google-login", function(event){
          event.preventDefault();
          gapi.auth.init(function() {
            window.setTimeout(GoogleAuth.Controller.checkAuth, 1);
            //
        });
      });
    });
  /* In later steps, add additional functions above this line. */

GoogleAuth.Controller.loadAPIClientInterfaces = function() {
  console.log("counsel");
    gapi.client.load('youtube', 'v3', function() {
    });
  }
