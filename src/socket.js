var io; //our socket.io server (passed in from the app)

var configureSockets = function(socketio) {
  io = socketio;

  io.sockets.on('connection', function(socket) {

    socket.join('livefeed');
    socket.emit('Update_toClient', {'gif' : 'Hotline Bling' , 'sc' : 'https://soundcloud.com/jagjaguwar/unknown-mortal-orchestra-first-world-problem'});


    socket.on('kick_happened', function(data){
      console.log(data.comment.body);
      //socket.emit('kick', {time: 10});
      io.sockets.in('livefeed').emit('kick', { time: 50, comment: data.comment });
    });

    socket.on('disconnect', function(data){
      socket.leave('livefeed');
    });

  });
};

//export our public function
module.exports.configureSockets = configureSockets;
