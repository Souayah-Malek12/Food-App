const mongoose = require("mongoose")


const restaurantSchema = new mongoose.Schema ({
    title: {type: String,
        required: [true, 'Restaurent title is required ']
    },
    imageUrl: {
        type: String
    },
    foods: { type: Array},
    time:  {
        type :String
    },
    pickup: {
        type: Boolean,
        defautl: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    logo : {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1 ,
        max : 5
    },
    ratingCount: {type: String},
    code: { type: String},
    coords: {
        id: {type: String},
        latitude: { type: Number},
        latitudeDelta: { type: Number},
        longtitude: { type: Number},
        longtitudeDelta: { type: Number},
        address: {type: String},
        title: { type: String},
    }
},{timestamps: true})

module.exports = mongoose.model("Restaurent", restaurantSchema );