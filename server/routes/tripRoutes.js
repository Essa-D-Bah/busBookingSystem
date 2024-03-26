const router = require("express").Router();
const {
  getAllTrips,
  createTrip,
  bookTrip,
  getCompanyTrips,
} = require("../controllers/tripController");
const { verifyToken } = require("../middleware/auth");
const roles = require("../roles");

router.get("/trips", verifyToken(roles), getAllTrips);
router.get("/company/:id", verifyToken([roles[0], roles[1]]), getCompanyTrips);
router.post("/create", verifyToken([roles[0], roles[1]]), createTrip);
router.post("/book", verifyToken(roles), bookTrip);

module.exports = router;
