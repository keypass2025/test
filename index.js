const express = require("express");
const app = express()
app.use(express.json());

const port = 8080;
var cors = require('cors')
app.use(cors())


const connection = require("./connection");

const UserModel = require('./userModel');


// const userRouter = express.Router();


app.post('/login', async (req, res) => {
    const { password } = req.body;
    try {
        const newPass = password;
        const user = await UserModel.create({ ...req.body, password: newPass });
        res.status(200).send({ 'msg': 'User registered successfully', user })
    } catch (error) {
        res.status(400).send({ 'msg': error.message });
    }
})

// app.use(userRouter);

// app.use(cors());
// app.use('/donation', donationRouter);
// app.use('/admin',adminRouter)

app.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({'msg' : error.message});
    }
    
});

app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
  });
  

app.listen(port, async () => {
  try {
    // const mongoose = require('mongoose');
    // require('dotenv').config();

    // mongoose.connect('mongodb+srv://sm2025:*123456789*@cluster0.v6880.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0');
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
    console.log(`server running on ${port} `) 
});

// mongodb+srv://nyvive:o5yPRr6p0cP78Tw5@cluster0.v6880.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// mongodb+srv://nyvive:o5yPRr6p0cP78Tw5@cluster0.v6880.mongodb.net/?retryWrites=true&w=majority&appName=users


// mongodb+srv://<sm2025>:<*123456789*>@cluster0.v6880.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
