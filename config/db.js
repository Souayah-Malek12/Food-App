const mongoose = require("mongoose");

 const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conencted to Database ${mongoose.connection.host}`)
    } catch(error){
        console.log("DB error ");
    }
}

module.exports = {connectDB}