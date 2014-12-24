var restify = require('restify');
var fs      = require('fs');
var request = require('request');
var parser = require('rssparser');
var options = {};

var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/readAllAboutIt');

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'conection error:'));
db.once('open', function (callback) {

  var newsSchema = mongoose.Schema({
    title: String,
    summary: String,
    url: String,
    timeAgo: String
  })

});
*/



parser.parseURL('http://news.sky.com/feeds/rss/home.xml', options, function(err, sky){
  console.log(sky);
});

parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml', options, function(err, bbc){
  console.log(bbc);
});

parser.parseURL('http://feeds.feedburner.com/TheHackersNews', options, function(err, hacker){
  console.log(hacker);
});

var server = restify.createServer({
  name: 'ReadAllAboutIt',
});

//set up default headers (fullResponse) and to reuse code (bodyParser)
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.get("/", function(req, res, next) {
  res.send('All news bulletins will be displayed with this endpoint');
  return next();
});

server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});


