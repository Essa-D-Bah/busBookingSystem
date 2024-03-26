const router = require("express").Router();
const {
  getAnalytics,
  getAnalyticsCompany,
} = require("../controllers/analyticsController");

router.get("/admin", getAnalytics);
router.get("/company/:id", getAnalyticsCompany);

module.exports = router;
