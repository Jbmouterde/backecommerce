const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: { type: String }, 
    owner : {
      type : Schema.Types.ObjectId, 
      ref : "User", 
      required : true
    }
  },
  
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Message = mongoose.model("Trip", messageSchema);
module.exports = Message;