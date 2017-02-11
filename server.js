var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/*router*/
var users = require('./app/routes/users');
var products = require('./app/routes/productos');
var courses = require('./app/routes/cursos');
var packages = require('./app/routes/paquetes');
/*router*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res){
    res.json({ message: 'API for Botsi Project' });
});

app.use('/api', router);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/packages', packages);
app.use('/api/courses', courses);

app.listen(port);
console.log('Magic happens on port '+ port );