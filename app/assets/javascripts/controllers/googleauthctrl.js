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
      client_id: this.controller.keys().client_id.responseText
        , scope: this.controller.keys().scopes
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
          client_id: this.controller.keys().client_id.responseText,
          scope: this.controller.keys().scopes,
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