var express = require('express');
var router = express.Router();
var pg = require('pg');
var connString = "postgres://@localhost/tea_raw_sql";

router.get('/', function(req, res, next) {
  var teas = [];
  pg.connect(connString, function(err, client, done) {
    if (err) return console.log(err);
    var query = client.query("SELECT * FROM teas");

    // streaming back rows one at a time
    query.on('row', function(row) {
      teas.push(row);
    });
    
    // fired after last row is emitted
    query.on('end', function() {
      done();
      res.render('teas/index', {teas: teas});
    });
  });
});

module.exports = router;
