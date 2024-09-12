const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')
const pool = require('./config/database')
// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//config template engine
configViewEngine(app);

app.use(webRouter);

const PORT = process.env.PORT||3004;


//check connection
// pool.query((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL: ' + err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as id ' + pool.threadId);
// });




app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});