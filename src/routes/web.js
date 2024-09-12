const express = require('express')
const router = express.Router()
const {getHomePage,getCart, getUser,deleteUser, createViewUser,getEditUser,updateUser} = require('../controllers/homeController')

router.get('/', getHomePage);
router.get('/cart', getCart);
router.post('/user', getUser);
router.get('/createUser', createViewUser);
router.get('/editUser/:id', getEditUser);
router.post('/updateUser/:id', updateUser);
router.get('/deleteUser/:id', deleteUser);
module.exports = router;