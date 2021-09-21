const express = require('express');
const app = express();
const port = process.env.NODE_ENV || 5000;

//database connection
require('./models/db');

app.use(express.json());

//router
const router = require('./router/index');
app.use('/', router);

//listen port
app.listen(port, () => {
    console.log(`App listen in port ${port}`);
})