$('#start-dream-btn').click(function() {
	console.log("in nanobar.js");
	var options = {
	  bg: 'silver',
	  // leave target blank for global nanobar
	  target: document.getElementById('start-dream-btn'),
	  // id for new nanobar
	  id: 'mynano'
	};
	var nanobar = new Nanobar( options );	
});