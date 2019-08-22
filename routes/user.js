/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
/* User section. */
router.get('/', function(req, res, next) {
  res.send('Api section for user activties');
});

module.exports = router;
