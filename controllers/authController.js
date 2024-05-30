const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

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
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({userName, email, password: hashedPassword, address, phone})
        res.status(201).send({
            success: true,
            message : 'Successfelly registered please Log in' 

        })
    }catch(error){
        console.log(error);
    }
} 

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide Email and Password',
            });
        }

        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        // Remove password from the response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        });
    }
};


module.exports = {registreController, loginController}