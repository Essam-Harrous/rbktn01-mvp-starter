var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/memes');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var memeTemplatesSchema = mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  width: Number,
  height: Number,
  box_count: Number
});


var memeTemplate = mongoose.model('memeTemplate', memeTemplatesSchema);

var generatedMemesSchema = mongoose.Schema({
  url: String,
  name: String
})

var generatedMeme = mongoose.model('generatedMeme', generatedMemesSchema)


// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

module.exports.memeTemplate = memeTemplate;
module.exports.generatedMeme = generatedMeme;