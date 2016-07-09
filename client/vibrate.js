var socket = io.connect();

navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

socket.on('kick', function(data){
  console.log("vibrate");
  navigator.vibrate(data.time);
});
