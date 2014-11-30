
$(document).ready(function(){
  // event.preventDefault();
  $("a#dream-btn").leanModal({
    top : 200,
    overlay : 0.7,
    closeButton: ".modal_close",
    });

  $(".login").on("click","a#dream-btn", function(){
    $('.login').fadeOut("slow");
  });
});

// $(document).ready(function(){
//   $(".login").on("click","a#dream-btn", function(){
//     $('.login').hide();
//   });
// });
