const testUserController = (req, res)=> {
    try{
        res.status(400).send("<h1>Test User Data</h1>")
        res.json({message:"maekee"})
    }catch(error){
        console.log("error in test Api", error);
    }
}

module.exports = {testUserController};