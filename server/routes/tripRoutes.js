const router = require('express').Router()
const {getAllTrips, createTrip, bookTrip} = require('../controllers/tripController');
const { verifyToken } = require('../middleware/auth');
const roles = require('../roles');



router.get('/trips', verifyToken(roles), getAllTrips);
router.post('/create', verifyToken([roles[0], roles[1]]), createTrip)
router.post('/book', verifyToken(roles), bookTrip)

module.exports =router;