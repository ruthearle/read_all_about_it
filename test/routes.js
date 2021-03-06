var server = require('../server.js')
var expect = require('Chai').expect;
var http = require('http');

describe('server', function() {
  before(function () {
    server.listen(8080);
  });

  after(function() {
    server.close();
  });
});

describe('/', function() {
  it('should return 200', function (done) {
    http.get('http://localhost:8080', function(response) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
