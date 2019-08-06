var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'Welcome@123',
  database : 'db_collypeq_collegewrk'
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

     connection.query("INSERT INTO worker_admin_chat (`user_id`, `message`,`message_type`, `user_type`) VALUES ('" + msg.user_id + "', '" + msg.body + "','"+msg.message_type+"','"+msg.user_type+"')", function (err, rows, fields) {
     if (err) throw err
     console.log('The solution is: ',err)
    });
    console.log(msg);

    io.emit('user2_message'+msg.user_id, msg);
  });


 //   socket.on('user_message', function(msg){
 //    //  connection.query('SELECT * FROM `messages`', function (err, rows, fields) {
 //    //   if (err) throw err
 //    //   console.log('The solution is: ', rows)
 //    // })

 //    io.emit('user_message', rows);
 //  });
 });

http.listen('8001', function(){
  console.log('listening on *:3000');
});
//,'172.24.5.51'
