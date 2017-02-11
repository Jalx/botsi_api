var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var request = require('request');
var _ = require('lodash');
var fs = require('fs'),json;

pathToJson = './app/data/paquetes.json';
urlToJson = "https://raw.githubusercontent.com/Jalx/botsi_api/master/app/data/paquetes.json";
jsonObj = {
    "packages": [
        {
            "id": 1,
            "client" : "Khristian Cruz",
            "marca": "anker",
            "keywords": ["usb", "anker", "cable", "paquete"],
            "description" : "Anker 5 Pack",
            "urlItem": "https://www.amazon.com/gp/product/B015XPQ5KK",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 2,
            "client" : "Khristian Cruz",
            "marca": "sony",
            "keywords": ["audifonos", "sony"],
            "description" : "sony audifonos",
            "urlItem": "https://www.amazon.com/gp/product/B00UC9QKQ2",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 3,
            "client" : "Khristian Cruz",
            "marca": "samsung",
            "keywords": ["sd", "memoria", "micro", "samsung", "microsd"],
            "description" : "Samsung Micro SD 32gb",
            "urlItem": "https://www.amazon.com/gp/product/B00IVPU786",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 4,
            "client" : "Nelly Machado",
            "marca": "f-dorla",
            "keywords": ["Power", "Powerbank", "PowerBand", "cargador"],
            "description" : "Power Bank Solar",
            "urlItem": "https://www.amazon.com/gp/product/B01G8O1UIC",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 5,
            "client" : "Karla Ruiz",
            "marca": "ELEGIANT",
            "keywords": ["proyector", "miniproyector", "elegian"],
            "description" : "Mini Projector ELEGIANT",
            "urlItem": "https://www.amazon.com/gp/product/B01G8O1UIC",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 6,
            "client" : "Jesus Machado",
            "marca": "Dulces",
            "keywords": ["dulces", "Jelly"],
            "description" : "Jelly Bean",
            "urlItem": "https://www.amazon.com/gp/product/B017KQSD7S",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 7,
            "client" : "Jonathan Irula",
            "marca": "Samsung",
            "keywords": ["celular", "telefono", "cell", "phone", "galaxy"],
            "description" : "Galaxy S5",
            "urlItem": "https://www.amazon.com/gp/product/B01CS5EBYU",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
         {
            "id": 8,
            "client" : "Alexis Lovo",
            "marca": "Dell",
            "keywords": ["teclado", "teclado dell", "dell"],
            "description" : "Teclado Dell",
            "urlItem": "https://www.amazon.com/gp/product/B01CS5EBYU",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 9,
            "client" : "Jose Neftali",
            "marca": "valvula",
            "keywords": ["valvula"],
            "description" : "valvula",
            "urlItem": "http://www.ebay.com/itm/262213520225",
            "statusESA": false,
            "statusUSA": true,
            "entregado": false
        },
        {
            "id": 10,
            "client" : "Victor Noe",
            "marca": "Sony",
            "keywords": ["juego", "ps4"],
            "description" : "Kingdom Hearts",
            "urlItem": "https://www.amazon.com/gp/product/B01LYEQNHP",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 11,
            "client" : "Carlos Manuel",
            "marca": "Boligrafo",
            "keywords": ["lapicero", "boligrafo", "clasico"],
            "description" : "Boligrafo Negro Clasico",
            "urlItem": "http://www.ebay.com/itm/272417938742",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 12,
            "client" : "Carlos Henrique",
            "marca": "Lacoste",
            "keywords": ["locion", "colonia", "lacoste"],
            "description" : "Eau Lacoste Blanc Energized",
            "urlItem": "http://www.ebay.com/itm/361804162006",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 13,
            "client" : "Juan Rodriquez",
            "marca": "Fossil",
            "keywords": ["reloj", "fossil"],
            "description" : "Reloj de pulsera Fossil Para Hombre Cronógrafo Deportivo",
            "urlItem": "http://www.ebay.com/itm/361804162006",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 14,
            "client" : "Alan Villegas",
            "marca": "Zmodo",
            "keywords": ["camaras", "set"],
            "description" : "Zmodo 720p HD Wireless Home Surveillance Camera System",
            "urlItem": "https://www.amazon.com/gp/product/B01LBJ82A8",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        },
        {
            "id": 15,
            "client" : "Alan Villegas",
            "marca": "dtech",
            "keywords": ["cargador", "power", "wiiu"],
            "description" : "DTCH Power Supply Universal 100 - 240V AC Adapter for Wii U",
            "urlItem": "https://www.amazon.com/gp/product/B00UDJJR3O",
            "statusESA": true,
            "statusUSA": false,
            "entregado": false
        }
        
    ]
};

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
    var queryParamKw = req.params.paramKw;
    var queryParamNm = req.params.paramNm;
    console.log(queryParamKw + ' ' + queryParamNm);
    var collection = _.filter(jsonObj.packages, function(o) { return _.includes(o.client, queryParamNm);});
    var indexModel = _.findIndex(collection, function(o) { return _.includes(o.keywords, queryParamKw); });
    var model = collection[indexModel];
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

module.exports = router;