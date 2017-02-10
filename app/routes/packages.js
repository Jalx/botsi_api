var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res){
    res.json({ message: 'Products from package model' });
});

router.get('/about', function(req, res){
    res.json({ message: 'Contains data from packages for Salvador Express.' });
});

module.exports = router;