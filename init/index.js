//writing all intialing logic here!
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js"); //requiring model

//connect to DB
MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({}); //if any data , 1st delete that 
    await Listing.insertMany(initData.data); //1.cleaning the data
    console.log("data was intialized");
};

initDB();



 