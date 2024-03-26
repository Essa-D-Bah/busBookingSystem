const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seatNumber: { type: Number },
  price: { type: Number, required: true },
  busNumberPlate: { type: String, required: true },
  status: {
    type: String,
    enum: ["booked", "cancelled", "used"],
    default: "booked",
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
