const express = require('express')
const router = express.Router()
const {getHomePage,getCart, newUser,deleteUser, viewCreateUser,EditUser,updateUser} = require('../controllers/homeController')

router.get('/', getHomePage);
router.get('/cart', getCart);
router.post('/user', newUser);
router.get('/createUser', viewCreateUser);
router.get('/editUser/:id', EditUser);
router.post('/updateUser/:id', updateUser);
router.post('/deleteUser/:id', deleteUser);
module.exports = router;