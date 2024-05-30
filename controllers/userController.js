const getUserConroller = async(req, res)=> {
    res.status(200).send("User Data");
};  

module.exports= {getUserConroller}