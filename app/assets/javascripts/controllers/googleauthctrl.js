Dreams.GoogleAuthCtrl = function(keys){
  this.keys = keys;
}

Dreams.GoogleAuthCtrl.prototype = {

  view: function(){
    return new Dreams.GoogleAuthView;
  },

  receiveMessage: function(event){
    if (event.origin !== "https://accounts.google.com") return;
  },

  checkAuth: function() {
    gapi.auth.authorize({
      client_id: this.ga_ctrl.keys.client_id.responseText
        , scope: this.ga_ctrl.keys.scopes
        , immediate: false }, this.ga_ctrl.handleAuthResult);
    },

  // Handle the result of a gapi.auth.authorize() call.
    handleAuthResult: function(authResult) {
      if (authResult) {
        // Auth was successful. Hide auth prompts and show things
        // that should be visible after auth succeeds.
        this.ga_ctrl.view().authSuccess;

        $('#menu-toggle').fadeOut('fast');

        token = authResult.access_token;

        this.ga_ctrl.loadAPIClientInterfaces();

    } else {
      this.contoller.view().authFail();

      $('#login-link').click(function() {
        gapi.auth.authorize({
          client_id: this.ga_ctrl.keys.client_id.responseText,
          scope: this.ga_ctrl.keys.scopes,
          immediate: false
          }, this.ga_ctrl.handleAuthResult);
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
          var changeSong = new Dreams.AudioCtrl($(".audio_player"));
          changeSong.audioChange("/audio/audio4.mp3")
          YouTubeData.Account.getUserChannel();

      });
    });
  }
}