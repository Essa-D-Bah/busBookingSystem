const router = require('express').Router();
const {getAnalytics}= require('../controllers/analyticsController')

router.get('/admin', getAnalytics)

module.exports = router