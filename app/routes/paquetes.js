var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs'),json;

pathToJson = './app/data/paquetes.json';

router.get('/', function(req, res){res.json({ message: 'Products from package model' });});

router.get('/:id', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var idPack = req.params.id;
        var model = _.find(obj.packages, function(o) { return o.id == idPack; });
        if (model.statusESA == false){
            var placeholderData = 'Su paquete aun no se encuentra en el país.'            
        } else {
            var placeholderData = 'Su paquete ya esta disponible para ser retirado :)'                        
        }
        console.log(model);
        res.json({
            "messages": [
                {"text": placeholderData}
            ]
        });
    });
});

router.get('/:id', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var idPack = req.params.id;
        var model = _.find(obj.packages, function(o) { return o.id == idPack; });
        res.json({
            "messages": [
                {"text": "Su id es " + idPack},
                {"text": model}
            ]
        });
    });
});

module.exports = router;