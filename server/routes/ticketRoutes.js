const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware/auth')
const {
  getAllTicketsForCompany,
  getAllTicketsForTrip,
  getAllTicketsForClient,
  createTicket,
  updateTicket,
} = require('../controllers/ticketController');
const roles = require('../roles')

// Get all tickets for a company
router.get('/company/:companyId',verifyToken([roles[0], roles[1]]), getAllTicketsForCompany);

// Get all tickets for a bus
router.get('/bus/:busId', verifyToken([roles[0], roles[1]]), getAllTicketsForTrip);

// Get all tickets for a client
router.get('/client/:userId', verifyToken([roles[0], roles[1], roles[2]]), getAllTicketsForClient);

// Create a new ticket
router.post('/create', verifyToken(roles),createTicket);

// Update an existing ticket
router.put('/:id',verifyToken(roles), updateTicket);

// router.delete("/:id",verifyToken(), deleTicket);

module.exports = router;
