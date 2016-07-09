var GIPHY_API_KEY = "dc6zaTOxFJmzC";
var GIPHY_API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search?";
var gifs = [];

function getGiphy(query){

    if(query){ var queryStripped = query.replace(/\s/g, '+'); }
    else{ queryStripped = 'adventure+time'; }
    
    var searchURL = GIPHY_API_URL_SEARCH + 'q=' + queryStripped + '&api_key=' + GIPHY_API_KEY;

    //get the gifs from giphy based on the giftopic search
    $.getJSON(searchURL, function( data ) {
    	returnGiphy(data);
    });
}


function returnGiphy(data){
	gifs = []; //clear array of gifs

	$.each( data.data, function( i , item ) {
		//check if gifs 
		if(item.images.downsized.url){
			var url = item.images.downsized.url;
			var new_image = new Image();
			new_image.src = url;
			gifs.push(new_image);
		}
	});
}


function setRandomBackground(){
	var randomIndex = Math.floor((Math.random() * gifs.length) + 1);
	$('body').css('background-image', 'url(' + gifs[randomIndex].src + ')');
}