const express = require("express");
const router = express.Router();
const {registreController} = require('../controllers/authController')

router.post('/registre', registreController)

module.exports = router;