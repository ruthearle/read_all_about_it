// Require Mongose
var mongoose = require('mongoose'),
    ttl = require('mongoose-ttl'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.ObjectId;

mongoose.connect('mongodb://localhost:27017/news', {
  db: { native_parser: false },
  server: { poolSize: 1 }
});

mongoose.connection.on('open', function() {
  console.log('We have a connection, baby!');
});

mongoose.connection.on('error', function (err) {
  console.log("Connection error: " + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log("DB disconnected through app termination");
    process.exit(0);
  });
});

// Defining the schema for the news aggregator
var newsItemsSchema = new Schema({
    provider: String,
    title: String,
    summary: String,
    url: String,
    timeAgo: String,
});

newsItemsSchema.plugin(ttl, { ttl: 900 });

Item = mongoose.model('Item', newsItemsSchema);

module.exports = Item;
