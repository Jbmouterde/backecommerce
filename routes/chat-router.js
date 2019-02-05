var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var app = express();
// var socket = io('http://localhost:3000');


var Chat = require('../models/Chat.js');

// // GET /api/chat
// router.get('/chat', function(req, res, next) {
//     res.send('Express REST API');
// });


// GET ALL CHATS  /api/chat/:room
router.get('/chat/:room', function(req, res, next) {
    Chat.find({ room: req.params.room }, function (err, chats) {
        if (err) return next(err);
        res.json(chats);
    });
});
  
// SAVE CHAT /api/chat
router.post('/chat', function(req, res, next) {
    Chat.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});







module.exports = router;