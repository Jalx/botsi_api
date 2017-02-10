var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.get('/', function(req, res){
    res.json({ message: 'Products from courses model' });
});

router.get('/about', function(req, res){
    res.json({ message: 'Contains courses data from English Zone school.' });
});

module.exports = router;