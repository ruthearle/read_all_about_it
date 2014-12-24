var restify = require('restify');

var server = restify.createServer({
  name: 'ReadAllAboutIt',
});

server.listen(8080, function(){
  console.log('Houston we are a go!');
});
