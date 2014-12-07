var BackGround = {}

BackGround.View ={
  blackOut: function(){
    $('#big-video-wrap').fadeOut('slow');
    $('#lean_overlay').fadeOut('slow');
  },

  reAppear: function(){
    $('#big-video-wrap').fadeIn('slow');
    loginFadeIn();
    $("#error-novideos").fadeOut('fast');
    $('#menu-toggle').fadeIn('slow');
  },

  dreamHasEnded: function(){
    if('undefined' !== typeof token){
   var logout = "https://accounts.google.com/o/oauth2/revoke?token=" + token;
   console.log("Wake up " + token);
   $.ajax({
      type: 'GET',
      url: logout,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(nullResponse) {
       location.reload ();
      },
      error: function(e) {
      }
    });
  } else {
    location.reload ();
  }
 }
}

$(document).ready(function(){
  var BV;
  $(function() {
    // initialize BigVideo
    BV = new $.BigVideo();
    BV.init();
    BV.show(['videos/vid1.mp4','videos/vid2.mp4','videos/vid3.mp4','videos/vid4.mp4','videos/vid5.mp4','videos/vid6.mp4']);
    });
});
