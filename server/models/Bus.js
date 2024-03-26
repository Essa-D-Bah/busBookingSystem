const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  numberPlate: {
    type: String,
    require: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  numberOfSeats: {
    type: Number,
    required: true,
  },
  driver: {
    type: String,
  },
});

const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;
