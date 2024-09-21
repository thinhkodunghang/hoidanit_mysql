const Custumer = require("../models/custumer");
const  {uploadFile} =require("../services/fileSevice");

module.exports = {
    postCreateCustumer: async (req,res) =>{
        
        const {name, address, phone, email,description} = req.body;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let fileImage = req.files.image;
        fileImage = Array.isArray(fileImage)? fileImage: [fileImage];
        
        const resultUrl = await uploadFile(fileImage);
        const imageUrl = resultUrl[0]?.patch;
        const result = await Custumer.create(
            {name, 
            address,
            phone,
            email,
            description,
            image:imageUrl
        });

        return res.status(200).json(
            {
                errorCode: 0,
                data: result
            }
        );
    },
};