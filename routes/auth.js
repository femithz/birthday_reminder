var express = require('express');
var router = express.Router();

// /* GET authentication section of the API. */
router.get('/', function(req, res, next) {
  res.send('Api authentication section for user');
});

module.exports = router;
 