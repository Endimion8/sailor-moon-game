const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const allEnemies = require('./config/objects');


const socketIO = require('socket.io');

const app = express();

const users = require('./routes/users');

const port = process.env.PORT || 8080;

// Connect to Database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' +config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' +err);
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Cors MiddleWare
app.use(cors());  //  разрешает обращаться к серверу с любого домена

//  Body Parser MiddleWare
app.use(bodyParser.json());

// PassPort MiddleWare
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

// Start server
let server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


const io = socketIO.listen(server);

io.on('connection', (socket) => {
    console.log('Client connected');

    const currentEnemies = new Set(allEnemies);

    socket.on('askNewPlayer', (playerInfo) => {  // когда приходит запрос на добавление нового пользователя
        console.log('Client logged in');
        socket.player = {                        // playerInfo содержит имя, список достижений и прочие данные
            id: playerInfo.id,
            name: playerInfo.name,
            inGame: false        
        };
        console.log(socket.player.id);
        socket.emit('allPlayers',getAllPlayers());  // новому пользователю отсылаем массив всех пользователей
        socket.broadcast.emit('newPlayer',socket.player);  // остальным шлем, что добавился новый пользователь
    });

    socket.on('askAllPlayers', () => {      
        console.log(getAllPlayers());    
        socket.emit('allPlayers',getAllPlayers());
    });


    socket.on('askToRemove', () => {                            // Когда кто-то разлогинился
        console.log('Client logged out');
        if (socket.player) {
            socket.broadcast.emit('removePlayer', socket.player.id); // Остальных просим удалить его из активных
        }
    });

    socket.on('askNewPlayerGame', (start) => {  // когда приходит запрос на добавление нового игрока
        console.log('Игрок зашел в игру');
        if (socket.player) {
            socket.player.x = start.x;
            socket.player.y = start.y;
            if (socket.player.inGame !== undefined) {
                socket.player.inGame = true;
            }
        }
        console.log(socket.player.id);
        socket.emit('allPlayersGame',getAllPlayersGame());  // новому пользователю отсылаем массив всех пользователей
        socket.broadcast.emit('newPlayerGame',socket.player);  // остальным шлем, что добавился новый пользователь
    });

    socket.on('askToRemoveGame', () => {                            // Когда кто-то разлогинился
        console.log('Client out of game');
        if (socket.player) {
            socket.player.inGame = false;
            socket.broadcast.emit('removePlayerGame', socket.player.id); // Остальных просим удалить его из активных
        }
    });

    socket.on('disconnect', () => {             
        console.log('Client DISconnected');
    });
  });

  function getAllPlayers() {   // Получаем массив подключенных пользователей
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {   // Проверять пользователей на униакльность!!!
        var player = io.sockets.connected[socketID].player;
        if (player) players.push(player);
    })
    return players;
 }

 function getAllPlayersGame() {   // Получаем массив играющих пользователей
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {   // Проверять пользователей на униакльность!!!
        var player = io.sockets.connected[socketID].player;
        if (player && player.inGame) players.push(player);
    })
    return players;

    
 }

 