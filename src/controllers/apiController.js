const User = require("../models/user");
const {uploadFile} = require("../services/fileSevice");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});

  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postUsersAPI = async (req, res) => {
  const { email, name, city } = req.body;
  let results = await User.create({ email, name, city });

  return res.status(200).json({
    errorCode: 0,
    data: results
  });
};

const putUserAPI = async (req, res) => {  
  const {userId,email, name, city} = req.body;
  
  let results = await User.updateOne({_id: userId}, {$set:{email, name, city}} );
  
  return res.status(200).json({
    errorCode: 0,
    data: results
  });
};

const deleteUserAPI = async function(req, res) {
  const {userId} = req.body;
  
  let results =  await User.deleteOne({_id : userId});

  return res.status(200).json({
    errorCode: 0,
    data: results
  });
};

const postUploadFileAPI = async (req, res) => {
    

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let fileImage = req.files.image;
  fileImage = Array.isArray(fileImage)? fileImage: [fileImage];

  const result = await uploadFile(fileImage);
  console.log(result);
  return res.send("ok");

  
};

// const postUploadMultipleFileAPI = async (req, res) => {
    

 
  
// };


module.exports = { getUsersAPI, postUsersAPI,putUserAPI,deleteUserAPI,postUploadFileAPI};
