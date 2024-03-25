const Bus = require('../models/Bus')
const getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json({ buses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//get buses specific to a particular company
const getCompanyBuses = async (req, res) => {
    const { companyId } = req.params;
    try {
        const buses = await Bus.find({companyId: companyId});
        if (!buses || buses.length === 0){
            return res.status(404).json({ message: "No Buses found"})
        }
        res.json({ buses })
    } catch (error) {
        res.status(500).json({ message: 'Error getting the buses' })
    }
}

const createNewBus = async (req, res) => {
    const newBus = new Bus(req.body);
    
    try{
       const savedBus = await newBus.save()
       res.status(201).json(savedBus)
    }catch(err){
      res.status(400).send(err)
    }
  
}

const updateABus = async (req,res)=>{
    const {id}=req.params
    const updates=req.body

    const options={new:true}
    try{
        const updatedBus=await Bus.findByIdAndUpdate(id,updates,options)
        res.json(updatedBus)
    }catch(err){
        res.status(404).json({message:"The bus with the given ID was not found."})
    }
}

// const bookingBus = async (req, res) => {
//     const {startCity, destination, date, time} = req.body;
//     const buses = await Bus.find({startCity, endCity:destination});
//     res.status(200).send(buses);
// }


module.exports = {getCompanyBuses,createNewBus,updateABus,getAllBuses};