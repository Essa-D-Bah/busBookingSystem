const router = require("express").Router();
const {
  getAllBuses,
  getCompanyBuses,
  updateABus,
  createNewBus,
} = require("../controllers/busController");
const { verifyToken } = require("../middleware/auth");
const roles = require("../roles");

router.get("/all", verifyToken(roles), getAllBuses);
router.get("/company/:companyId", verifyToken(roles), getCompanyBuses);
router.post("/create", verifyToken([roles[0], roles[1]]), createNewBus); // add a new bus to the database
router.put("/:id", verifyToken([roles[0], roles[1]]), updateABus); // Update an existing


module.exports = router;
