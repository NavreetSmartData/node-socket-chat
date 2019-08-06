var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'testteam',
  database : 'laravel-chat'
});

connection.connect(function(err) {
    if (err) throw err;
});

connection.query('SELECT * FROM `users`', function (err, rows, fields) {
  if (err) throw err
  console.log('The solution is: ', rows[0].first_name)
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
 // connection.query('INSERT INTO `messages`(user_id,user2_id,body') VALUES ()', function (err, rows, fields) {
 //     if (err) throw err
 //     console.log('The solution is: ', rows[0].first_name)
 //    })


io.on('connection', function(socket){
  
  socket.on('chat_message', function(msg){

     connection.query("INSERT INTO messages (`user_id`, `user2_id`, `body`) VALUES ('" + msg.user_id + "', '" + msg.user2_id + "', '" + msg.body + "')", function (err, rows, fields) {
     if (err) throw err
     console.log('The solution is: ',err)
    });
    console.log(msg);
    
    io.emit('user2_message', msg);
  });
   

 //   socket.on('user_message', function(msg){
 //    //  connection.query('SELECT * FROM `messages`', function (err, rows, fields) {
 //    //   if (err) throw err
 //    //   console.log('The solution is: ', rows)
 //    // })

 //    io.emit('user_message', rows);
 //  });
 });

http.listen('3001', function(){
  console.log('listening on *:3000');
});
//,'172.24.5.51'