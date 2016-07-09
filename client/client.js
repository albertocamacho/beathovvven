$( document ).ready(function() {

	var audio = document.getElementById('player');
	var socket = io.connect(); 
	var sc = new SoundCloud();
	var dancer = new Dancer();
	var initialized = false;
	var voted = [];



	var kick = dancer.createKick({
		onKick:function(mag){
			setRandomBackground();
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



	socket.on('connect', function(){ });	

	socket.on('Update_toClient', function(data){
		loadMedia(data.gif, data.sc);
	});


	socket.on('Giphy_Suggestion_toClient', function(suggestionsString){
		$('#gif-suggestions').empty();
		var suggestionsObj = $.parseJSON(suggestionsString); 
		var suggestions =  $.map(suggestionsObj, function(el) { return el; });

		for(var i = 0; i < suggestions.length; i++){
			var suggestion = suggestions[i].name;
			var votes = suggestions[i].votes;

			createGiphySuggestion(suggestion, votes)
		}
	}); 

	function createGiphySuggestion(suggestionName, suggestionVotes){
		var name = suggestionName;
        var votes = suggestionVotes;
  
        var a = document.createElement('a');
        a.className = 'suggestion';
        a.addEventListener("click", sendGiphySuggestion);

		$(a).append('<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> ');
        $(a).append('<span class = "gif-suggestion-vote">' + votes + '</span');
        $(a).append('<span class = "gif-suggestion-content"> ' + name + ' </span>');

        document.getElementById('gif-suggestions').appendChild(a);
	}



	function sendGiphySuggestion(){
		var suggestion_votes = $(this).find('.gif-suggestion-vote');
		suggestion_votes = parseInt(suggestion_votes);
		var suggestion_name = $(this).find('.gif-suggestion-content').html();
		suggestion_name = suggestion_name.slice(1, -1);

		$(this).className += voted;
		socket.emit('Giphy_Suggestion_toServer', { suggestion: suggestion_name, votes: suggestion_votes }); 
	}

	function sendSCSuggestion(){
		var suggestion_votes = $(this).find('.sc-suggestion-vote').html();
		suggestion_votes = parseInt(suggestion_votes);
		var suggestion_name = $(this).find('.sc-suggestion-content').text();
		suggestion_name = suggestion_name.slice(1, -1);
		socket.emit('SC_Suggestion_toServer', { suggestion: suggestion_name, votes: suggestion_votes } );
	}

	var checkLoadedInterval = setInterval(function(){
		var loaded = dancer.isLoaded();
		console.log('loaded');
		if(loaded == true){
			initialized = true;
			dancer.play();
			clearInterval(checkLoadedInterval);
		}
	}, 1000);   





/*
    function createSuggestionInput(suggestionClass){

    	var a = document.createElement('a');

        a.addEventListener('keypress', function(e){
            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;
            if (keyCode == '13'){
                var a = document.getElementById('gif-suggestion-input').value;
                socket.emit('New_Giphy_Suggestion_toServer', { suggestion: s, votes: 1 } ); 
                return false;
            }
        }, false);

        

        $(li).append('<input class="menu-input" id = "gif-suggestion-input" type="text" placeholder="suggest">');
        document.getElementById('gif-suggestion-list').appendChild(li);

    }

    */
});


