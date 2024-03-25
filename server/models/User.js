const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'company', 'client'], default:"client", required: true },
  name:{type: String, require:true},
  password: { type: String, required: true },
  address:{type:String},
  telephone:{type:String}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
