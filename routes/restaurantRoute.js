const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getAllRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantController");
const router = express.Router();


router.post("/create", authMiddleware, createRestaurantController );
router.get('/getAll', getAllRestaurantController);
router.get('/get/:id', getAllRestaurantByIdController);
router.delete('/delete', authMiddleware, deleteRestaurantController)

module.exports = router;