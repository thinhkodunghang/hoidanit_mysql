const express = require('express')
const routerAPI = express.Router()
const {getUsersAPI,postUsersAPI,putUserAPI,deleteUserAPI,postUploadFileAPI} = require('../controllers/apiController');
const {postCreateCustumer} = require('../controllers/CustumerController');


routerAPI.post('/users', postUsersAPI);
routerAPI.get('/users', getUsersAPI);
routerAPI.put('/users', putUserAPI);
routerAPI.delete('/users', deleteUserAPI);
routerAPI.post('/file', postUploadFileAPI);
routerAPI.post('/custumer', postCreateCustumer);





module.exports = routerAPI;