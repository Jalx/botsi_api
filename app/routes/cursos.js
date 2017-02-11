var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res){res.json({ message: 'Products from courses model' });});

module.exports = router;