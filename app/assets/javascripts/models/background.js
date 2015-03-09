Dreams.BackGround = function(){

};

Dreams.BackGround.prototype = {
  blackOut: function(){
    $('#big-video-wrap').fadeOut('slow');
    $('#lean_overlay').fadeOut('slow');
  },

  reAppear: function(){
    $('#big-video-wrap').fadeIn('slow');

    $('#login').fadeIn("slow");

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
