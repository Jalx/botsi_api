var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs'),json;

router.get('/', function(req, res){
    res.json({ message: 'Users route' });
});

router.get('/about', function(req, res){
    res.json({ message: 'Contains data from users registered in the system.' });
});
router.get('/test', function(req, res){
    var myjson = 'https://api.myjson.com/bins/usey5';
    request(myjson, function(err, body){
      res.json({message:body}); //res is the response object, and it passes info back to client side
  });
});

router.get('/:id', function(req, res){
    var pathToJson = './app/data/test.json';
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var idUser = req.params.id;
        var userModel = _.find(obj.users, function(o) { return o.id == idUser; });
        console.log(userModel);
        res.json({
            message: 'Su id es ' + idUser,
            data: userModel
        });
    });
});
router.get('/name/:name', function(req, res){
    var pathToJson = './app/data/test.json';
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var paramUrl = req.params.name;
        console.log(obj.users);
        var userModel = _.find(obj.users, function(o) { 
            console.log(paramUrl);
            return o.firstName.toLowerCase() == paramUrl.toLowerCase()
        });
        console.log(userModel);
        res.json({
            message: 'Hola ' + paramUrl,
            data: userModel
        });
    });
});
router.get('/lastName/:lastname', function(req, res){
    var pathToJson = './app/data/test.json';
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var paramUrl = req.params.lastname;
        console.log(obj.users);
        var userModel = _.filter(obj.users, function(o) { 
            console.log(paramUrl.toString());
            return o.lastName.toLowerCase() == paramUrl.toLowerCase()
        });
        console.log(userModel);
        res.json({
            message: 'Hola ' + paramUrl,
            data: userModel
        });
    });
});

module.exports = router;