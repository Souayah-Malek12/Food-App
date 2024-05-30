const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();
//midleware: 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/test', require('./routes/testRoutes'));

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));

app.get('/',(req, res)=> {
    return res.status(200).send( "<h1>Welcome Food Server App<h1>");
})

const PORT = process.env.PORT;
//db connection
connectDB();

app.listen(PORT, ()=> {
    console.log(`Server Running on ${PORT}`);
});