Dreams.GoogleAuthKeys = function(){

}

Dreams.GoogleAuthKeys.prototype = {
  client_id:
    $.ajax({
      url: '/client',
      type: 'GET',
      dataType: 'JSON'})
  ,

  apiKey:
    $.ajax({
      url: '/api',
      type: 'GET',
      dataType: 'JSON'})
  ,

  scopes: ['https://www.googleapis.com/auth/youtube','https://www.googleapis.com/auth/yt-analytics.readonly']
}

Dreams.GoogleAuthCtrl = function(){

}

Dreams.GoogleAuthCtrl.prototype = {

  view: function(){
    return new Dreams.GoogleAuthView;
  },

  keys: function(){
    return new Dreams.GoogleAuthKeys;
  },

  receiveMessage: function(event){
    if (event.origin !== "https://accounts.google.com") return;
  },

  checkAuth: function() {
    gapi.auth.authorize({
      client_id: this.controller.keys.client_id.responseText
        , scope: this.controller.keys.scopes
        , immediate: false }, this.controller.handleAuthResult);
    },

  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        this.controller.view().authSuccess;

        $('#menu-toggle').fadeOut('fast');

        token = authResult.access_token;

        this.controller.loadAPIClientInterfaces();

    } else {
      this.contoller.view().authFail();

      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: this.controller.keys.client_id.responseText,
          scope: this.controller.keys.scopes,
          immediate: false
          }, this.controller.handleAuthResult);
        });
      }
    },

    loadAPIClientInterfaces: function() {
      gapi.client.load('youtube', 'v3', function() {
        gapi.client.load('youtubeAnalytics', 'v1', function() {
        // After both client interfaces load, use the Data API to request
        // information about the authenticated user's channel.
          var bg = new Dreams.BackGround;
          bg.blackOut();
          var changeSong = new Audio.Controller;
          changeSong.audioChange("/audio/audio4.mp3")
          YouTubeData.Account.getUserChannel();

      });
    });
  }
}

Dreams.GoogleAuthView = function(){

}

Dreams.GoogleAuthView.prototype = {
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
  window.controller = new Dreams.GoogleAuthCtrl;
  var volumeSet = new Audio.Controller();
  volumeSet.audioSet()

  $(".sign-in").on("click","a", function(event){
    event.preventDefault();
    $("#dream-modal").hide();

    gapi.auth.init(function() {
      window.setTimeout(window.controller.checkAuth, 1);
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

    var logout = "https://accounts.google.com/o/oauth2/revoke?token=" + token;

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












