$( document ).ready(function() {

	var audio = document.getElementById('player');
	var socket = io.connect(); 
	var sc = new SoundCloud();
	var dancer = new Dancer();
	var initialized = false;

	var kick = dancer.createKick({
		onKick:function(mag){
			//some function on kick
			// vibrate
		}
	});

	kick.on();

	function loadMedia(gifTopic, scTopic){
		sc.setSC(scTopic, function(){	
			if(initialized == false){
				dancer.load(audio);
			}
			getGiphy(gifTopic);
		});
	}



	socket.on('connect', function(){ 
		//when the client connects
	});	

	socket.on('Update_toClient', function(data){
		loadMedia(data.gif, data.sc);
	});



	var checkLoadedInterval = setInterval(function(){
		var loaded = dancer.isLoaded();
		console.log('loaded');
		if(loaded == true){
			initialized = true;
			dancer.play();
			clearInterval(checkLoadedInterval);
		}
	}, 1000);   





});


