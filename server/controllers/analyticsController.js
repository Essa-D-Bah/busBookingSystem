const Bus = require('../models/Bus')
const Ticket = require('../models/Ticket')
const User = require('../models/User')


const getAnalytics = async (req, res)=>{
   try {
   const bus = await Bus.find();
   const numberOfBuses = bus.length

   const ticket = await Ticket.find();
   const numberOfTickets = ticket.length
  
   const users = await User.find();
   const numberOfuser = bus.length
   
   const analytics = {buses:numberOfBuses, tickets:numberOfTickets, users:numberOfuser}
   res.send(analytics)
   } catch (error) {
      res.send(error)
   }
   

}

const getAnalyticsCompany = async (req, res)=>{
   const companyId = req.params
   try {
   const bus = await Bus.find({companyId});
   const numberOfBuses = bus.length

   const ticket = await Ticket.find();
   const numberOfTickets = ticket.length
  
   const users = await User.find();
   const numberOfuser = bus.length
   
   const analytics = {buses:numberOfBuses, tickets:numberOfTickets, users:numberOfuser}
   res.send(analytics)
   } catch (error) {
      res.send(error)
   }
   

}

module.exports= {getAnalytics}