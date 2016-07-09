$( document ).ready(function() {

	var audio = document.getElementById('player');
	var socket = io.connect();
	var sc = new SoundCloud();
	var dancer = new Dancer();
	var initialized = false;

	var kick = dancer.createKick({
		threshold: 0.3,
		onKick:function(mag){
			socket.emit('kick_happened', "kick");
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

	navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

	socket.on('kick', function(data){
	  console.log("vibrate");
	  navigator.vibrate(data.time);
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
