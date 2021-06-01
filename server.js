var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/shop');
var Product = require('./Model/product.js');
var WishList = require('./Model/wishlist.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/product', function(req,res){
	var product = new Product();
	product.title = req.body.title;
	product.price = req.body.price;
	product.save(function(err,savedProduct){
		if(err) {
			res.status(500).send({error: "Could not save product"});
		} else {
			res.status(200).send(savedProduct);
		}
	});
});


app.get('/product',function(req,res) {
	Product.find({},function(err,products){
		if(err){
			res.status(500).send({error: "Could not fetch item."});
		} else {
			res.send(products);
		}
	});
});

app.get('/wishlist',function(req,res){
	WishList.find({}).populate({path:'products', model: 'Product'}).exec(function(err,wishlist){
		if(err){
			res.status(500).send({error:"Could not fetch wishlist."});
		} else {
			res.status(200).send(wishlist);
		}
	});
});

app.post('/wishlist',function(req,res){
	var wishList = new WishList();
	wishList.title = req.body.title;

	wishList.save(function(err,newWishList){
		if(err){
			res.status(500).send({error: "Could not create wishlist."});
		} else{
			res.status(200).send(newWishList);
		}
	});
});

app.put('wishlist/product/add',function(req,res){
	Product.findOne({_id: request.body.productId},function(err,product){
		if(err){
			res.status(500).send({error: "Product not found."});
		} else{
			WishList.update({_id:request.body.wishListId},{$addToSet:{products:product._id}},function(err,wishList){
				if(err){
					res.status(500).send({error: "Could not add product."});
				}
				else {
					res.status(200).send(wishList);
				}
			});
		}
	});
});


app.listen(3000, function(){
	console.log("Shop API running on port 3000.");
}); 