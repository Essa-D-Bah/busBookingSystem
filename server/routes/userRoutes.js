const {getAllCompanies, getACompany} = require('../controllers/userController')
const { verifyToken } = require('../middleware/auth')
const router = require('express').Router()





router.get('/all', verifyToken([ 'admin' ]),getAllCompanies)
// GET /api/companies - Get all companies (accessed at GET http://localhost:8080/api/companies)

router.get( '/:id',verifyToken(), getACompany);  //route to get a single company by its id  

module.exports = router;

