var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = mongoose.Schema.Types.ObjectId;

var wishlist = new Schema({
	title: {type: String, default: "Cool Wishlist"},
	products: [{type:objectId, ref:'Product'}]
});

module.exports = mongoose.model('WishList', wishlist);