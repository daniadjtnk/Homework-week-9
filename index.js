const express = require('express');
const app = express();
const pool = require('./database.js');
const userRouter = require('./routers/user.js');
const movieRouter = require('./routers/movies.js');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./documentation/swagger.json')
const morgan = require('morgan')

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Swagger
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Morgan
app.use(morgan('common'));

app.use(userRouter);
app.use(movieRouter);

pool.connect((e, res) => {
    console.log(e)
    console.log('connected')
});

app.listen(4000);

