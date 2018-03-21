
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  imageUrl: {type: String},
  group: [{type: Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', schema);
