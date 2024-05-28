const userModel = require("../models/userModel");

const registreController = async (req, res) => {
    try{
        const {userName, password, email, phone, address } = req.body;
        if(!userName || !email || !password || !phone || !address){
            return res.status(500).send({
                success: false,
                message : 'please Provide All field' 
            })
        } 
        const existingUser = await  userModel.findOne({email})
        if(existingUser){
            return res.status(500).send({
                success: false,
                maesage : 'user exist' 
            });
        }
        const user = await userModel.create({userName, email, password, password, phone})
        res.status(201).send({
            success: true,
            message : 'Successfelly registered please Log in' 

        })
    }catch(error){
        console.log(error);
    }
} 

module.exports = {registreController}