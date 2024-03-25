const mongoose = require('mongoose');


const companySchema = new  mongoose.Schema({
    name: { type : String , required : true },
    address:{type:String},
    telephone:{},
});

const Company = mongoose.model('Company', companySchema)
module.exports = Company;