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
                {
                    "text": placeholderData,
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Hello!",
                            "buttons": [
                                {
                                "type": "web_url",
                                "url": model.urlItem,
                                "title": "Ver Item"
                                }
                            ]
                        }
                    },
                }
            ]
        });
    });
});

router.get('/query/:paramNm/:paramKw', function(req, res){
    fs.readFile(pathToJson, (err, data) => {
        if (err) throw err;
        var obj = JSON.parse(data);
        var queryParamKw = req.params.paramKw;
        var queryParamNm = req.params.paramNm;
        console.log(queryParamKw + ' ' + queryParamNm);
        var collection = _.filter(obj.packages, function(o) { return _.includes(o.client, queryParamNm);});
        var indexModel = _.findIndex(collection, function(o) { return _.includes(o.keywords, queryParamKw); });
        var model = collection[indexModel];
        //var model = _.includes(obj.packages, queryParamKw);
        console.log(collection);
        console.log(model);
        if (model.statusESA == false){
            var placeholderData = 'Su paquete aun no se encuentra en el país.'            
        } else {
            var placeholderData = 'Su paquete ya esta disponible para ser retirado :)'                        
        }
        res.json({
            "messages": [
                {
                    "text": placeholderData,
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "button",
                            "text": "Hello!",
                            "buttons": [
                                {
                                "type": "web_url",
                                "url": model.urlItem,
                                "title": "Ver Item"
                                }
                            ]
                        }
                    },
                }
            ]
        });
    });
});

module.exports = router;