var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs'),json;

pathToJson = './app/data/test.json';

router.get('/', function(req, res){
    res.json({
        "messages": [
            {"text": "Users route"}
        ]
    });
});

router.get('/:id', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var idUser = req.params.id;
        var userModel = _.find(obj.users, function(o) { return o.id == idUser; });
        res.json({
            "messages": [
            {"text": "Su id es" + idUser},
            {"data": userModel}
            ]
        });
    });
});

router.get('/name/:name', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var paramUrl = req.params.name;
        var userModel = _.find(obj.users, function(o) { 
            return o.firstName.toLowerCase() == paramUrl.toLowerCase()
        });
        res.json({
            "messages": [
                {"text": "Hola " + paramUrl},
                {"data": userModel}
            ]
        });
    });
});
router.get('/lastname/:lastname', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var paramUrl = req.params.lastname;
        var userModel = _.filter(obj.users, function(o) { 
            return o.lastName.toLowerCase() == paramUrl.toLowerCase()
        });
        res.json({
            "messages": [
                {"text": "Hola " + paramUrl},
                {"data": userModel}
            ]
        });
    });
});

module.exports = router;