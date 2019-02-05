const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// const chatSchema = new Schema({
//     room: { type: String },
//     nickname: { type: String },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "User"
//     },
//     message: { type: String }
// }, {
//   timestamps: true
// });

var chatSchema = new mongoose.Schema({
    room: String,
    username: String,
    // member: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    message: String,
    updated_at: { type: Date, default: Date.now },
  });

  
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;