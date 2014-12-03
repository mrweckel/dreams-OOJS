Audio.Controller = function(){
  var audio = $(".audio_player");
}
Audio.Controller.prototype ={

  audioChange: function(sourceUrl) {
    var audio = $(".audio_player");
    $("#bg_audio").attr("src", sourceUrl);
    /****************/
    audio[0].pause();
    audio[0].load();
    audio[0].volume = 0.6;
    audio[0].play();
    /****************/
  },

  audioSet: function() {
    var audio = $(".audio_player");
    audio[0].volume = 0.4;
  }
}