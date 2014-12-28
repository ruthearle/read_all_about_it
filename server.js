var restify = require('restify'),
    fs      = require('fs'),
    request = require('request'),
    parser = require('rssparser'),
    restifyMongoose = require('restify-mongoose'),
    options = {},
    __ = require('underscore'),
    db = require('./model/news'),
    news = restifyMongoose(db);

var server = restify.createServer({
  name: 'ReadAllAboutIt',
  version: '0.0.1'
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
     });
  };
});

parser.parseURL('http://feeds.feedburner.com/TheHackersNews', options, function(err, hacker){
  for (var i = 0; i < 10; i ++) {
    var items = hacker.items[i];
        hackerDocument = new db({
        provider: hacker.title,
        title: items.title,
        summary: items.summary,
        url: items.url,
        timeAgo: items.time_ago,
     });

     hackerDocument.save(function(err) {
        if (err) console.log(err);
     });
  }
});


//set up default headers (fullResponse) and to reuse code (bodyParser)
server.use(restify.acceptParser(server.acceptable));
server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Homepage is mapped to showing all news items
server.get('/', news.query(), function(request, response, next) {
  response.send();
  return next();
});

// Routes made available through Restify-Mongoose.
server.get('/news/:id', news.detail());



server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});


