$(document).ready(function(){
  window.controller = new Dreams.GoogleAuthCtrl;
  var volumeSet = new Dreams.AudioCtrl($(".audio_player"));
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












