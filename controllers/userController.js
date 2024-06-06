const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")

const getUserConroller = async(req, res)=> {
try{
    const user = await userModel.findById({_id: req.body.id})
    if(!user){
        res.status(404).send({
            success: false,
            message: 'User not found'
        })
    }
    user.password = undefined;
    res.status(200).send({
        success: true,
        message : "User got successfully",
        user
    })
}catch(error){
    console.log(error);
    res.status(500).send({
        success: false,
        message : 'Error in Get User API',
        error
    })
}

};  

const updateUserController = async(req, res) =>{
    try{
        const user = await userModel.findById({_id: req.body.id})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'user Not Found'
            })
        }
        const  {userName, address, phone, profil} = req.body;
        if(userName) user.userName = userName
        if(address) user.address = address 
        if(phone) user.phone = phone
        if(profil) user.profil = profil
        await user.save();
        res.status(500).send({
            success: false,
            message: "Error in update User API",
            error
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Update API'
        })
    }
}

const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body;
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: 'provide all information'
            })
        }
        const user = await userModel.findOne({ email, answer})
        if(!email){
            return res.status(404).res({
                success: false,
                message: 'User Not found'
            })
        }
         var Salt = bcrypt.genSaltSync(10);
         const hashedPassword = await bcrypt.hash(newPassword, Salt);
         user.password = hashedPassword;
         await user.save();
         res.status(200).sed({
            success : true,
            message: 'User updated successfully'
         })
    }catch{
        console.log(error)
        res.status(500).send({
            success: false,
            message :'error in password Reset APi',
            error
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not found"
            });
        }
        
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please provide both old and new passwords."
            });
        }
        
        const isMatch = await bcrypt.compare(oldPassword, user.password); 
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid old password"
            });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save({ validateModifiedOnly: true });

        
        res.status(200).send({
            success: true,
            message: "Password updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in password update API",
            error
        });
    }
};

const deleteProfileController = async(req, res)=> {
    try{
        const user = await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted  "
        })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not found"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete password API",
            error
        });
    }
}

module.exports= {getUserConroller, deleteProfileController, updateUserController, resetPasswordController, updatePasswordController}