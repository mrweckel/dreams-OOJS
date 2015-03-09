Dreams.YouTubeCtrl = function(search_func){
  this.search_func = search_func;
}

Dreams.YouTubeCtrl.prototype = {
  initialize: function(){
    this.randomDream();
  },

  randomDream: function(search_func){
    $(".random-dream").on("click","a", function(event){
    event.preventDefault();
    $("#dream-modal").hide();
    $("#dream-modal-container").fadeIn(1000);
    $("input#youtube").focus();

    window.setTimeout(function() {
      search_func;
    }, 1);

    var event_counter = 0;
    $("body").on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',".ui-autocomplete",
      function() {
        if(event_counter % 2 != 0) {
           $('ul.ui-autocomplete').css('display', 'none');
         }
        event_counter ++;
     });
  });
  }
}