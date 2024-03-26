const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
  bus: {
    type: mongoose.Types.ObjectId,
    ref: "Bus",
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: "Bus",
  },
  startCity: { type: String },
  destination: { type: String },
  price: { type: Number },
  departureDate: { type: Date },
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
