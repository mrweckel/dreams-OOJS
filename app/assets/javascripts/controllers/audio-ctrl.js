Dreams.AudioCtrl = function(audio){
  this.audio = audio;
}
Dreams.AudioCtrl.prototype ={

  audioChange: function(sourceUrl) {
    $("#bg_audio").attr("src", sourceUrl);
    /****************/
    this.audio[0].pause();
    this.audio[0].load();
    this.audio[0].volume = 0.6;
    this.audio[0].play();
    /****************/
  },

  audioSet: function() {
    this.audio[0].volume = 0.4;
  }
}