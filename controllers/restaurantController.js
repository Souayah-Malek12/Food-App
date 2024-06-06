const restaurentModel = require("../models/restaurentModel");

const createRestaurantController = async (req, res) => {
    try{
        const {
                title,
             imageUrl, 
             foods, 
             pickup, 
             delivery, 
             isOpen, logo, 
             rating, 
             ratingCount, 
             code, 
             coords } = req.body;
        
        if(!title || !coords){
           return res.status(500).send({
               success: false,
               message: 'please provide title and address'
           })
        }
        const newRestaurant = new restaurentModel({
            title,
             imageUrl, 
             foods, 
             pickup, 
             delivery, 
             isOpen, logo, 
             rating, 
             ratingCount, 
             code, 
             coords
        })
        newRestaurant.save();
        res.status(201).send({
            success: true,
            message: 'new Restaurant Created successfully'
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error In Create Restaurant Api',
            error
        })
    }
};

const getAllRestaurantController = async(req, res)=> {
    try{
        const restaurants = await restaurentModel.find({})
        if(!restaurants) return res.status(404).send({
            success: false,
            message: 'No restaurant available'
        })
        res.status(201).send({
            success: true,
            totalCount: restaurants.length,
            restaurants
        })
    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error In get all Restaurant Api',
            error
        })
    }
}
const getAllRestaurantByIdController = async(req, res) => {
    try{
        const {restaurantId} = req.params.id;
        if(!restaurantId) {
            return res.status(404).send({
                success: false,
                message: 'Please provide restaurant id '
            });
        }
        const restaurant = await restaurentModel.findById(restaurantId);
        if(!restaurant){
            return res.status(404).send({
                success: false,
                message: 'Error in get restaurant by id api',
                error
            })
            res.status(200).send({
                success: true,
                restaurant,
            })
        }

    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Error In get  Restaurant By id Api',
            error
        })
    }
}

const deleteRestaurantController = ()=> {

}

module.exports = {createRestaurantController, getAllRestaurantController, getAllRestaurantByIdController, deleteRestaurantController};