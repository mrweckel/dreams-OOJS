var GoogleAuth = {}

  GoogleAuth.Keys = {
    client_id: '340894032158-a7ro9gvu0cm86sotbepj9pei5sgi1nk9.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/yt-analytics.readonly']
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
        GoogleAuth.Controller.handleAuthResult);
    },


  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        GoogleAuth.View.authSuccess();
        console.log(authResult);
        $('#menu-toggle').fadeOut('fast');

        GoogleAuth.Controller.loadAPIClientInterfaces();

        token = authResult.access_token;
        console.log(token)

    } else {

      GoogleAuth.View.authFail();

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
  $(".sign-in").on("click","a", function(event){
    event.preventDefault();
    $("#dream-modal").hide();
    gapi.auth.init(function() {
      window.setTimeout(GoogleAuth.Controller.checkAuth, 1);
    });
  });

  $("#wake-up").on("click", "a",function(event){
    $("#wake-up").fadeOut("slow");
    $.ajax({
      url: '/users/logout',
      type: 'GET',
      success: location.href= "http://localhost:3000/",
      error: console.log("Logout error on AJAX")
    });
    
    var logout = "https://accounts.google.com/o/oauth2/revoke?token=" + token
    console.log("Wake up " + token);
    $.ajax({
      type: 'GET',
      url: logout,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(nullResponse) {
        location.href = "http://localhost:3000/";
        },
      error: function(e) {
      }
    });
  });
});
  /* In later steps, add additional functions above this line. */

GoogleAuth.Controller.loadAPIClientInterfaces = function() {
  gapi.client.load('youtube', 'v3', function() {
    gapi.client.load('youtubeAnalytics', 'v1', function() {
      // After both client interfaces load, use the Data API to request
      // information about the authenticated user's channel.
      BackGround.View.blackOut();
      YouTubeData.Account.getUserChannel();

    });
  });
}











