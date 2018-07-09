const express = require('express');
const router = express.Router();
const app = express();
const morgan = require('morgan'); 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');
const distinctRoute = require('./api/routes/distinct');
const expendituresRoute = require('./api/routes/expenditures');

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/', express.static('public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/distinct', distinctRoute);
app.use('/expenditures', expendituresRoute);

module.exports = app;
