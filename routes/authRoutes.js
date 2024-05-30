const express = require("express");
const router = express.Router();
const {registreController, loginController} = require('../controllers/authController')

router.post('/registre', registreController);
router.post('/login', loginController);

module.exports = router;