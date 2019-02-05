const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const articleSchema = new Schema({
  creator: String,
  description : String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
