
const User = require("../models/user");


const getHomePage = async (req, res) => {
  try {
    // const {email, name, city} = req.body;
    const users = await User.find({}).lean();
    
    res.render('home', {user: users});// truyền user in view để use
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }

};

const getCart = (req, res) => {
  res.send("Cart");
};

const newUser = async (req, res) => {
    const {email, name, city} = req.body;
    try {
      await User.create({email, name, city})  
      res.redirect('/');
    } catch (error) {
      res.status(500).send('error');
    }


 };
 
const EditUser = async (req, res) => {
  const id = req.params.id;
  try {
    
    const userEdit = await User.findById(id).exec();
    res.render("updateUser.ejs", {user: userEdit});
  } catch (error) {
      res.status(404).send('error');
  }
};

const updateUser = async (req, res) => {  
  const {email, name, city} = req.body;
  try {
    await User.updateOne({$set:{email, name, city}} );
    res.redirect("/");
  } catch (error) {
    res.status(404).send('error');
  }
};

const deleteUser = async function(req, res) {
  const userId = req.params.id;
  
  try {
    await User.deleteOne({_id : userId});
    res.redirect('/');
  } catch (error) {
    res.status(404).send('error');
  }
};



const  viewCreateUser = (req, res) => {
  res.render('createUser.ejs');
};

module.exports = {
  getHomePage,
  getCart,
  newUser,
  deleteUser,
  viewCreateUser,
  EditUser,
  updateUser
};

