var BackGround = {}

BackGround.View ={
  blackOut: function(){
    $('#big-video-wrap').fadeOut('slow');
    $('#lean_overlay').fadeOut('slow');
  }
}


$(document).ready(function(){
  var BV;
  $(function() {
    // initialize BigVideo
    BV = new $.BigVideo();
    BV.init();
    BV.show(['videos/vid4.mp4','videos/vid1.mp4','videos/vid5.mp4','videos/vid7.mp4','videos/vid2.mp4','videos/vid3.mp4']);
    });
});