var SC_CLIENT_ID = 'c87401e23d531754aada98044bb88d04';
var audioElement = document.getElementById('player');


function SoundCloud(client_id){
	//initialize soundcloud object
	SC.initialize({
		client_id: SC_CLIENT_ID
	});
}

SoundCloud.prototype.setSC = function(track_url, callback) {
	SC.resolve(track_url).then(getStream).then(setSong).then(callback);
};

var getStream = function (track) {
	return SC.get('/tracks/' + track.id);
};

var setSong = function(song){

	var stream_url = song.stream_url + '?client_id=' + SC_CLIENT_ID;

	audioElement.setAttribute("src", stream_url);
	audioElement.load();
	audioElement.play();
}



