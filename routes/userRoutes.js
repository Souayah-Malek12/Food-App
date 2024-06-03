const express= require("express");
const router = express.Router();
const {getUserConroller, updateUserController, updatePasswordController,resetPasswordController} = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/getUser',authMiddleware ,getUserConroller);

router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword',  authMiddleware ,resetPasswordController)

router.post('/updatePassword', authMiddleware, updatePasswordController )

module.exports = router;