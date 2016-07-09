$( document ).ready(function() {

	var audio = document.getElementById('player');
	var commentElement = document.getElementById('comment');
	var socket = io.connect();
	var sc = new SoundCloud();
	var dancer = new Dancer();
	var initialized = false;
<<<<<<< Updated upstream
	var comments;
	var index = 0;
=======
	var commentIndex = 0;
	var comments;
>>>>>>> Stashed changes

	var kick = dancer.createKick({
		threshold: 0.3,
		onKick:function(mag){
			socket.emit('kick_happened', 'kick')
			index += 1;
		}
	});

	kick.on();

<<<<<<< Updated upstream
	function loadMedia(gifTopic, scURL){
		sc.setSC(scURL, function(comments){
=======
	function setComment(comment){
		$(commentElement).html(comment);
	}

	function loadMedia(gifTopic, scTopic){
		sc.setSC(scTopic, function(){
>>>>>>> Stashed changes
			if(initialized == false){
				dancer.load(audio);
			}
			comments = comments;
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
