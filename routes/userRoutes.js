const express= require("express");
const router = express.Router();
const {getUserConroller} = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/getUser',authMiddleware ,getUserConroller)

module.exports = router;