var io; //our socket.io server (passed in from the app)


var configureSockets = function(socketio) {
  io = socketio; 

  io.sockets.on('connection', function(socket) { 

  socket.join('livefeed');
  
  socket.emit('Update_toClient', {'gif' : 'Hotline Bling' , 'sc' : 'http://soundcloud.com/forss/voca-nomen-tuum'});

    socket.on('disconnect', function(data){
      socket.leave('livefeed'); 
    });

  });
};

//export our public function
module.exports.configureSockets = configureSockets;