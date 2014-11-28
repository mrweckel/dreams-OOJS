var GoogleAuth = {}

GoogleAuth.Keys = {
  client_id: '340894032158-a7ro9gvu0cm86sotbepj9pei5sgi1nk9.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/youtube']
}

GoogleAuth.View = {}

  // The Google APIs JS client invokes this callback automatically after loading.
  // See http://code.google.com/p/google-api-javascript-client/wiki/Authentication


  // Attempt the immediate OAuth 2 client flow as soon as the page loads.
  // If the currently logged-in Google Account has previously authorized
  // OAUTH2_CLIENT_ID, then it will succeed with no user intervention.
  // Otherwise, it will fail and the user interface that prompts for
  // authorization will need to be displayed.

  GoogleAuth.Controller = {
    checkAuth: function() {
      gapi.auth.authorize({
        client_id: GoogleAuth.Keys.client_id,
        scope: GoogleAuth.Keys.scopes,
        immediate: false },
        GoogleAuth.Controller.handleAuthResult);
      },


  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        $('.pre-auth').hide();
        $('.post-auth').show();
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
      $('.post-auth').hide();
      $('.pre-auth').show();

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

  $(document).ready(function(){
      $(".login").on("click","a#google-login", function(event){
          event.preventDefault();
          gapi.auth.init(function() {
            window.setTimeout(GoogleAuth.Controller.checkAuth, 1);
            //
        });
      });
    });

  // Helper method to display a message on the page.
  GoogleAuth.View.displayMessage = function(message) {
    $('#message').text(message).show();
  }

  // Helper method to hide a previously displayed message on the page.
  GoogleAuth.View.hideMessage = function() {
    $('#message').hide();
  }

  /* In later steps, add additional functions above this line. */

GoogleAuth.Controller.loadAPIClientInterfaces = function() {
  console.log("counsel");
    gapi.client.load('youtube', 'v3', function() {
    });
  }
