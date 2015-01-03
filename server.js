var restify = require('restify'),
    fs      = require('fs'),
    request = require('request'),
    parser = require('rssparser'),
    options = {},
    __ = require('underscore'),
    mongoose  = require('mongoose')
    db = require('./model/news'),
    restifyMongoose = require('restify-mongoose'),
    news = restifyMongoose(db);

// Create the server using Restify
var server = restify.createServer(function (request, response) {
  name: 'ReadAllAboutIt'
});

// Connect to MongoDB
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

// populate db with sky, BBC and Hackers rss news feeds
parser.parseURL('http://news.sky.com/feeds/rss/home.xml', options, function(err, sky){
  for(var i = 0; i < sky.items.length && i < 10; i ++ ) {
     var items = sky.items[i],
         skyDocument = new db({
         provider: sky.title,
         title: items.title,
         summary: items.summary,
         url: items.url,
         timeAgo: items.time_ago,
     });

     skyDocument.save(function(err) {
        if (err) console.log(err);
        console.log('Sky doc saved!');
     });
  };

});

parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml', options, function(err, bbc){
  for (var i = 0; i < bbc.items.length && i < 10; i ++) {
    var items = bbc.items[i];
        bbcDocument = new db({
        provider: bbc.title,
        title: items.title,
        summary: items.summary,
        url: items.url,
        timeAgo: items.time_ago,
     });

     bbcDocument.save(function(err) {
        if (err) console.log(err);
        console.log('BBC doc saved!');
     });
  };
});

parser.parseURL('https://news.ycombinator.com/rss', options, function(err, hacker){
  for (var i = 0; i < hacker.items.length && i < 10; i ++) {
    var items = hacker.items[i];
        hackerDocument = new db({
        provider: hacker.title,
        title: items.title,
        summary: items.summary,
        url: items.url,
        timeAgo: items.time_ago,
        commentId: /\d+/.exec(items.summary).toString(),
     });

     hackerDocument.save(function(err) {
        if (err) console.log(err);
        console.log('Hacker News doc saved!');
     });
  }
});


//set up default headers (fullResponse) and to reuse code (bodyParser)
server.use(restify.acceptParser(server.acceptable));
server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Homepage is mapped to show index.html, which will be used to show news content
server.get('/news', news.query(), function(request, response, next) {
  response.send(200);
  return next();
});


// Serve static files
server.get(/.*/, restify.serveStatic({
  'directory': 'public',
  'default': 'index.html'
}));


// Routes made available through Restify-Mongoose.
//server.get('/news', news.query());
//server.get('/news/:id', news.detail());

server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});


