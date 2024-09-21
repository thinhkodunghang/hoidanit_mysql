const mongoose = require('mongoose');

const custumerSchema = new mongoose.Schema(
    
    {
        
        name: {
            type: String,
            required: true
        },
        addres: String,
        phone: String,
        email: String,
        image: String,
        description: String
    },
    {
        timestamps: true
    }
);
const Custumer = mongoose.model('custumer', custumerSchema);


module.exports = Custumer;