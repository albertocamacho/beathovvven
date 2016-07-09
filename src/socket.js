var io; //our socket.io server (passed in from the app)
var SC_Suggestions = [];
var Giphy_Suggestions = [];
var newGiphySuggestion = new suggestion(3, 'Trippy');
var newSCSuggestion = new suggestion(3, 'Tame Impala');

Giphy_Suggestions.push(newGiphySuggestion);
SC_Suggestions.push(newSCSuggestion);

var topGif;
var topSC;

/*
setInterval(function(){
  findTopSuggestions();
}, 10000);   

*/
function suggestion(votes, name){
  this.votes = votes;
  this.name = name;
}


/*
function findTopSuggestions(){
  topGif = Giphy_Suggestions[0];
  topSC = SC_Suggestions[0];

  for(var i = 1; i < SC_Suggestions.length; i++){
    if(SC_Suggestions[i].votes > topSC.votes){
      topSC = SC_Suggestions[i];
    }
  }
  for(var i = 1; i < Giphy_Suggestions.length; i++){
    if(Giphy_Suggestions[i].votes > topGif.votes){
      topGif = Giphy_Suggestions[i];
    }
  }

  updateMedia(topGif, topSC, function(){
    clearSuggestions();
  });
}


function updateMedia(gif, sc, callback){
  io.sockets.emit('Update_toClient', {'gif' : gif.name , 'sc' : sc.name });
  callback();
}

function clearSuggestions(){
  SC_Suggestions = [];
  Giphy_Suggestions = [];

  var newGiphySuggestion = new suggestion(3, 'Trippy');
  var newSCSuggestion = new suggestion(3, 'Tame Impala');

  Giphy_Suggestions.push(newGiphySuggestion);
  SC_Suggestions.push(newSCSuggestion);

  io.sockets.emit('SC_Suggestion_toClient', JSON.stringify(SC_Suggestions));
  io.sockets.emit('Giphy_Suggestion_toClient', JSON.stringify(Giphy_Suggestions));

}

*/

var configureSockets = function(socketio) {
  io = socketio; 

  io.sockets.on('connection', function(socket) { 

  socket.join('livefeed');
   socket.emit('Update_toClient', {'gif' : 'Hotline Bling' , 'sc' : 'Hotline Bling'});

   socket.emit('Giphy_Suggestion_toClient', JSON.stringify(Giphy_Suggestions));
   socket.emit('SC_Suggestion_toClient', JSON.stringify(SC_Suggestions));

/*
    socket.on('New_SC_Suggestion_toServer', function(data){
      newSuggestion = new suggestion(data.votes, data.suggestion);
      SC_Suggestions.push(newSuggestion);

      socket.emit('SC_Suggestion_toClient', JSON.stringify(SC_Suggestions));
    });

    socket.on('SC_Suggestion_toServer', function(data){
      for(var i = 0; i < SC_Suggestions.length; i++){
        if(SC_Suggestions[i].name == data.suggestion){
          SC_Suggestions[i].votes++;
          break;
        }
      }
      socket.emit('SC_Suggestion_toClient', JSON.stringify(SC_Suggestions));
    });


    socket.on('New_Giphy_Suggestion_toServer', function(data){
      newSuggestion = new suggestion(data.votes, data.suggestion);
      Giphy_Suggestions.push(newSuggestion);

      socket.emit('Giphy_Suggestion_toClient', JSON.stringify(Giphy_Suggestions));
    });

*/
    socket.on('Giphy_Suggestion_toServer', function(data){
      for(var i = 0; i < Giphy_Suggestions.length; i++){
        if(Giphy_Suggestions[i].name == data.suggestion){
          console.log(Giphy_Suggestions[i]);
          Giphy_Suggestions[i].votes++;
          break;
        }
      }
      socket.emit('Giphy_Suggestion_toClient', JSON.stringify(Giphy_Suggestions));
    });
  

    socket.on('disconnect', function(data){
      socket.leave('livefeed'); 
    });

  });
};

//export our public function
module.exports.configureSockets = configureSockets;