const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  date: String, 
  description : String, 
  imageUrl : String, 
  type : { 
    type: String,
    enum : ["bags", "teeshirt", "pants"]
  } 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
