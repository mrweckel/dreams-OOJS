var BackGround = {}

BackGround.View ={
  blackOut: function(){
    setTimeout(function(){$('video#bgvid').fadeOut('slow')},9500);
      setTimeout(function(){$('#lean_overlay').fadeOut('slow')},10000);
  }
}


$(document).ready(function(){
  var BV;
  $(function() {
    // initialize BigVideo
    BV = new $.BigVideo();
    BV.init();
    BV.show(['videos/vid1.mp4','videos/swan.mp4']);
    });
});