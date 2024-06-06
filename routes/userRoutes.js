const express= require("express");
const router = express.Router();
const {getUserConroller, updateUserController, deleteProfileController,updatePasswordController,resetPasswordController} = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


router.get('/getUser',authMiddleware ,getUserConroller);

router.put('/updateUser', authMiddleware, updateUserController)

router.post('/resetPassword',  authMiddleware ,resetPasswordController)

router.post('/updatePassword', authMiddleware, updatePasswordController )

router.delete('/deleteUser/:id', authMiddleware, deleteProfileController)

module.exports = router;