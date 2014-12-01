var BackGround = {}

BackGround.View ={
  blackOut: function(){
    setTimeout(function(){$('video#bgvid').fadeOut('slow')},9500);
      setTimeout(function(){$('#lean_overlay').fadeOut('slow')},10000);
  }
}
