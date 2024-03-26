const Bus = require("../models/Bus");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const Trip = require("../models/Trip");

const getAnalytics = async (req, res) => {
  try {
    const bus = await Bus.find();
    const numberOfBuses = bus.length;

    const ticket = await Ticket.find();
    const numberOfTickets = ticket.length;

    const users = await User.find();
    const numberOfuser = bus.length;

    const analytics = {
      buses: numberOfBuses,
      tickets: numberOfTickets,
      users: numberOfuser,
    };
    res.send(analytics);
  } catch (error) {
    res.send(error);
  }
};

const getAnalyticsCompany = async (req, res) => {
  const companyId = req.params.id;
  console.log("company", companyId);
  try {
    const bus = await Bus.find({ companyId });
    const busIds = bus.map((bus) => bus.id);
    const trips = await Trip.find({ bus: { $in: busIds } });
    const tripsIds = trips.map((trip) => trip.id);
    const tickets = await Ticket.find({ tripId: { $in: tripsIds } });
    const analytics = {
      bus,
      tickets,
      trips,
    };
    res.send(analytics);
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getAnalytics, getAnalyticsCompany };
