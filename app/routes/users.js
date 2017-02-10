var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var fs = require('fs'),json;

router.get('/', function(req, res){
    res.json({ message: 'Users route' });
});

router.get('/about', function(req, res){
    res.json({ message: 'Contains data from users registered in the system.' });
});

router.get('/:id', function(req, res){
    //var pathToJson = './app/data/test.json'
    var pathToJson = './app/data/dummy.json'
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var idUser = req.params.id;
        //console.log(obj);
        console.log(obj.members);
        //console.log(obj.members.indexOf(idUser));        
        res.json({
            message: 'Hola ' + idUser,
            data: obj
        });
    });
});

module.exports = router;