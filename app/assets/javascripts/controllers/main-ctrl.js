Dreams.Controller = function(){

}

Dreams.Controller.prototype = {

  initialize: function(auth_function){
    this.toggleMenu();
    this.toggleModal();
    this.dreamBtnToggle();
    this.signIn(auth_function);
  },

  signIn: function(auth_function){
    $(".sign-in").on("click","a", function(event){

      event.preventDefault();
      $("#dream-modal").hide();

      gapi.auth.init(function() {
        window.setTimeout(auth_function, 1);
      });
    });
  },

  dreamBtnToggle: function(){
    $("#login").on("click","a#dream-btn", function(){
      $('#login').fadeOut("slow")
    });
  },

  toggleMenu: function(){
    $('#menu-toggle').click(function(){
    if($('#menu').hasClass('open')){
      $('#menu').removeClass('open');
      $('#menu-toggle').removeClass('open');
    }else{
      $('#menu').addClass('open');
      $('#menu-toggle').addClass('open');
     }
    });
  },

  toggleModal: function(){
    $("a#dream-btn").leanModal({
    top : 200,
    overlay : 0.7,
    closeButton: ".modal_close",
    });
  },

  loginFadeOut: function(){
    $('#login').fadeOut("slow");
  },

  loginFadeIn: function(){
    $('#login').fadeIn("slow");
  },

  //must be implemented
  wakeUp: function(){
    $("#wake-up").on("click", "a",function(event){
      $("#wake-up").fadeOut("slow");

      $.ajax({
        url: '/users/logout',
        type: 'GET',
        success: location.href= "http://localhost:3000/",
        error: console.log("Logout error on AJAX")
      });
    });
  },

  //temporarily removed from production
  logOut: function(){
    var logout = "https://accounts.google.com/o/oauth2/revoke?token=" + token;

    $.ajax({
      type: 'GET',
      url: logout,
      async: false,
      contentType: "application/json",
      dataType: 'jsonp',
      success: function(nullResponse) {
        location.href = "http://localhost:3000/";
        },
      error: function(e) {
      }
    });
  }

}