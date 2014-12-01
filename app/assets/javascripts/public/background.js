var BackGround = {}

BackGround.View ={
  blackOut: function(){
    setTimeout(function(){$('#big-video-wrap').fadeOut('slow')},9500);
      setTimeout(function(){$('#lean_overlay').fadeOut('slow')},10000);
  }
}


$(document).ready(function(){
  var BV;
  $(function() {
    // initialize BigVideo
    BV = new $.BigVideo();
    BV.init();
    BV.show(['videos/vid4.mp4','videos/vid1.mp4','videos/vid6.mp4','videos/vid7.mp4','videos/vid2.mp4','videos/vid3.mp4']);
    });
});