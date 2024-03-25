const Trip = require('../models/Trip')



// Function to create a new trip in the database.
const createTrip= async(req, res) =>{  
    const newTrip = new Trip(req.body);
    try{
      const savedTrip = await newTrip.save()
      res.status(201).json(savedTrip)
    }catch(err){
        res.status(400).send(err)
    }
}

  // Get all trips from the database.
const getAllTrips = async(req, res) => {
   try {
    const trips = await Trip.find();
    if(trips.length === 0) {
       return res.status(404).json({ message: 'No entries found'})
    }
    res.status(200).json(trips)
   } catch (error) {
    res.status(500).json({ message: 'Error getting the Trips' })
   }
    
}

const bookTrip = async (req, res) => {
    const { startCity, destination, departureDate } = req.body;
    try {
        const conditions = [];
        if (startCity) {
            conditions.push({ startCity: { $in: startCity.split(' ') } });
        }
        if (destination) {
            conditions.push({ destination: { $in: destination.split(' ') } });
        }
        if (departureDate) {
            conditions.push({ departureDate: { $in: departureDate.split(' ') } });
        }
        
        const trips = await Trip.find({ $or: conditions });
        if (trips.length === 0) {
            return res.status(404).json("There is no such trip");
        }
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTrip =(req, res)=>{
    const {tripId} = req.params
    
}


module.exports={bookTrip, getAllTrips, createTrip}


