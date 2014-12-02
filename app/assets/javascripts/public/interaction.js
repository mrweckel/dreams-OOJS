
$(document).ready(function(){
  // event.preventDefault();
  $("a#dream-btn").leanModal({
    top : 200,
    overlay : 0.7,
    closeButton: ".modal_close",
    });

  loginFadeOut = function(){
    $('#login').fadeOut("slow");
  }

  loginFadeIn = function(){
    $('#login').fadeIn("slow");
  }

// JIC: might be able to throw the AJAX for back-end login in this jquery
  $("#login").on("click","a#dream-btn", function(){
    loginFadeOut();
  });
});

// $(document).ready(function(){
//   $(".login").on("click","a#dream-btn", function(){
//     $('.login').hide();
//   });
// });
