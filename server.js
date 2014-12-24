var restify = require('restify');
var fs      = require('fs');
var request = require('request');
var parser = require('rssparser');
var options = {};


var server = restify.createServer({
  name: 'ReadAllAboutIt',
});

//set up default headers (fullResponse) and to reuse code (bodyParser)
server.use(restify.fullResponse());
server.use(restify.bodyParser());

parser.parseURL('http://news.sky.com/feeds/rss/home.xml', options, function(err, sky){
  console.log(sky);
});

parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml', options, function(err, bbc){
  console.log(bbc);
});

parser.parseURL('http://feeds.feedburner.com/TheHackersNews', options, function(err, hacker){
  console.log(hacker);
});

/*request('http://api.ihackernews.com/page', function(err, response, hacker) {
  if (!err && response.statusCode == 200) {
    console.log(hacker);
  }
});
*/

server.listen(8080, function(){
  console.log('%s listening at %s', server.name, server.url);
});


