const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config();
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')
const APIRouter = require('./routes/api')
const connection = require('./config/database')
const fileUpload = require('express-fileupload');

// Middleware để xử lý dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware xử lý upload file
app.use(fileUpload());
//config template engine
configViewEngine(app);

app.use(webRouter);
app.use('/v1/api',APIRouter);


const PORT = process.env.PORT||3004;



(async ()=> {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Error: ", error);
    }
})();



