require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes')
const ticketRoutes=require("./routes/ticketRoutes")
const busRoutes = require("./routes/busRoutes")
const userRoutes = require('./routes/userRoutes')
const tripRoutes = require('./routes/tripRoutes')
const analyticsRoutes = require('./routes/analyticsRoute')
const roles = require('./roles')

const app = express();
const PORT = process.env.PORT || 8000  

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/auth', authRoutes)
app.use("/companies",userRoutes)
app.use('/ticket', ticketRoutes)
app.use( "/bus",busRoutes);
app.use('/trip', tripRoutes)
app.use('/analytics', analyticsRoutes)


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
