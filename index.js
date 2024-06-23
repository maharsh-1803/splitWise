const mongoose = require('mongoose');
const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./route/user.route.js')
const groupRoute = require('./route/group.route.js')


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use('/api/User',userRoute);
app.use('/api/Group',groupRoute);

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log("mongoDB connected");
    } catch (error) {
        console.log(error)
    }
}


app.listen(PORT,async()=>{
    await connectToMongoDB();
    console.log(`server is running on ${PORT}`);
})