const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(authController);
app.use(userController);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});