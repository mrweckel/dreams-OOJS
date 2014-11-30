$(document).ready(function () {
	$('#menu-toggle').click(function(){
		if($('#menu').hasClass('open')){
			$('#menu').removeClass('open');
			$('#menu-toggle').removeClass('open');
		}else{
			$('#menu').addClass('open');
			$('#menu-toggle').addClass('open');
		}
	});

  $('a#dream-btn').click(function(event){
    event.preventDefault();
    if($('#dreams-select').hasClass('open')){
      $('#menu').removeClass('open');
      $('#dreams-select').removeClass('open');
    } else {
      $('#dreams-select').addClass('open');
    }
  })
});