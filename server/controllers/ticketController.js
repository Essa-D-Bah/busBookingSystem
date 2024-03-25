const Ticket = require("../models/Ticket");
const Bus = require('../models/Bus')
const Trip = require('../models/Trip')
const User = require('../models/User')

// get all tickets specific to a company
//  async function  getAllTicketsForCompany (req, res) {
//   try {
//     const companyId = req.params.companyId;
//     const tickets = await Ticket.find({ companyId });
//     res.json({ tickets });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// async function getAllTicketsForBus  (req, res) {
//   try {
//     const busId = req.params.busId;
//     const tickets = await Ticket.find({ busId });
//     res.json({ tickets });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// async function getAllTicketsForClient(req, res) {
//   try {
//     const userId = req.params.userId;
//     const tickets = await Ticket.find({ userId });
//     res.json({ tickets });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// async function createTicket (req, res){
//   try {
//     const {
//       busId,
//       userId,
//       departureTime,
//       price,
//       date,
//       companyId,
//     } = req.body;
//     const ticket = new Ticket({
//       busId,
//       userId,
//       departureTime,
//       price,
//       companyId,
//     });
//     await ticket.save();
//     res.status(201).json({ ticket });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const updateTicket = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const options = { new: true };
//     const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, options);
//     if (!updatedTicket) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }
//     res.json({ updatedTicket });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// const deleTicket = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deletedTicket = await Ticket.findByIdAndDelete(id);
//       if (!deletedTicket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
//       res.json({ message: 'Ticket deleted successfully' });
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   };
  
// get all tickets specific to a company
async function getAllTicketsForCompany(req, res) {
    const companyId = req.params.companyId;
        try {
            // Find all buses belonging to the company
           const buses = await Bus.find({ companyId });
           // Extract busIds from the buses
           const busIds= buses.map(bus=>(bus.id))
           const trips = await Trip.find({bus:{$in:busIds}})
           const tripsIds = trips.map(trip=>(trip.id))
           const tickets = await Ticket.find({tripId:{$in:tripsIds}}); 
           
           const AllticketswithUserName = []

           await Promise.all(tickets.map( async ticket=>{
            const userId = ticket.userId
            const user= await User.findOne({_id:userId})
            if(user){
                const {busNumberPlate, price, status, _id}= ticket;
                const ticketi = {busNumberPlate,price,status, userName : user.name, id:_id}
                AllticketswithUserName.push(ticketi)
            }
           }))
            res.send(AllticketswithUserName);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    
    
}

async function getAllTicketsForTrip(req, res) {
    try {
        const tripId = req.params.tripId;
        const tickets = await Ticket.find({ tripId });
        res.json({ tickets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllTicketsForClient(req, res) {
    try {
        const userId = req.params.userId;
        const tickets = await Ticket.find({ userId });
        res.json({ tickets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createTicket(req, res) {
    try {
        const {
            tripId,
            userId,
            departureTime,
            price,
            busId
        } = req.body;
        
        const {numberPlate} = await Bus.findOne({_id:busId})
        const user = await User.findOne({_id:userId})
        const userName = user.name;
        const ticket = new Ticket({
            tripId,
            userId,
            departureTime,
            price,
            busNumberPlate:numberPlate
        });
        await ticket.save();
        res.status(201).json({ticket, userName });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const options = { new: true };
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, options);
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.json({ updatedTicket });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTicket,
    getAllTicketsForTrip,
    getAllTicketsForClient,
    getAllTicketsForCompany,
    updateTicket,
    deleteTicket
};


