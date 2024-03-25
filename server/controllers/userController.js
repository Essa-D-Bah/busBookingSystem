const User = require('../models/User')
const Bus = require('../models/Bus')



const getAllCompanies = async (req, res) => {
    try {
      let companies = await User.find({ role: 'company' });
      let allCompanies = [];
  
      await Promise.all(companies.map(async (company) => {
        const companyId = company._id;
        const buses = await Bus.find({ company: companyId });
        const numberOfBuses = buses.length;
        const { name, email, telephone, address } = company;
        const refinedCompany = { name, email, telephone, address, numberOfBuses };
        allCompanies.push(refinedCompany);
      }));
      res.status(201).json({ allCompanies });
  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  


const getACompany=async (req,res)=> {
   const { id } = req.params;
   try {
       const company = await User.findById(id);
       if(!company){
           return res.status(404).json({ message:"No user found" });
       }
       res.status(200).json(company);   
   }catch(err){
       res.status(500).json({ message: err.message });
   }
}


module.exports= {getAllCompanies, getACompany}