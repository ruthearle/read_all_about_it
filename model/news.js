// Require Mongose
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;
    //ttl = require('mongoose-ttl');

// Defining the schema for the news aggregator
var newsItemsSchema = new Schema({
    provider: String,
    title: String,
    summary: String,
    url: String,
    timeAgo: String,
    comments: String,
});



// This can be used once I figure out how to make the server fetch data automatically
//newsItemsSchema.plugin(ttl, { ttl: 900 });

Item = mongoose.model('Item', newsItemsSchema);

module.exports = Item;
