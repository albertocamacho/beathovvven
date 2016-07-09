$( document ).ready(function() {

	var audio = document.getElementById('player');
	var commentElement = document.getElementById('comment');
	var socket = io.connect();
	var sc = new SoundCloud();
	var dancer = new Dancer();
	var initialized = false;

	var scComments = [''];
	var index = 0;

	var kick = dancer.createKick({
		threshold: 0.45,
		onKick:function(mag){
			socket.emit('kick_happened', {prompt: 'kick', comment: scComments[index]})
			if(index < scComments.length){
				index += 1;
			}
			else {
				index = 0;
			}
		}
	});

	kick.on();



	function loadMedia(gifTopic, scURL){
		var client = this;
		sc.setSC(scURL, function(comments){

			if(initialized == false){
				dancer.load(audio);
			}
			scComments = comments;

			getGiphy(gifTopic);
		});
	}

	function setComment(comment){
		if(!!comment){
			$(commentElement).text(comment.body);
		}
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
    setComment(data.comment);
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
