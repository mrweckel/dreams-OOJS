Dreams.BigVideoCtrl = function(){

}

Dreams.BigVideoCtrl.prototype = {
  initialize: function(){
    var BV;
    $(function() {
      // initialize BigVideo
      BV = new $.BigVideo();
      BV.init();
      BV.show(['videos/vid1.mp4','videos/vid2.mp4','videos/vid3.mp4','videos/vid4.mp4','videos/vid5.mp4','videos/vid6.mp4']);
      });
  }
}