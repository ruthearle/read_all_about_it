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
});

// This can be used once I figure out how to make the server fetch data automatically
// When it is active the db is being populated but not showing on the route /news.
// Would have to rectify this if this feature is implemented

//newsItemsSchema.plugin(ttl, { ttl: 900 });

Item = mongoose.model('Item', newsItemsSchema);

module.exports = Item;
