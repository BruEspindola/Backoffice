const express = require('express');
const routes = express.Router();

const User = require('./controllers/usuarios.controller');
const Product = require('./controllers/product.controller');

routes.get('/', User.index);

//rotas de usuarios
routes.get('/api/user', User.index);
routes.get('/api/user.details/:_id', User.details);
routes.post('/api/user', User.create);
routes.delete('/api/user/:_id', User.delete);
routes.put('/api/user', User.update);
routes.post('/api/user/login', User.login);
routes.get('/api/user/checktoken', User.checkToken);
routes.get('/api/user/destroytoken', User.destroyToken);

//rotas de produtos
routes.get('/api/product', Product.index);
routes.get('/api/product.details/:_id', Product.details);
routes.post('/api/product', Product.create);
routes.delete('/api/product/:_id', Product.delete);
routes.put('/api/product', Product.update);



module.exports = routes