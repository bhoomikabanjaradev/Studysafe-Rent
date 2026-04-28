const express = require('express');
const app = express();
const mongoose= require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");



MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true})); //to parse the form data
app.use(methodOverride("_method")); //to override the method in form
// / use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate); //setting as ejsmate as the engine for ejs files
app.use(express.static(path.join(__dirname,"public"))); //to serve static files from public folder


app.get('/', (req,res)=>{
    res.send("you are at root route");
});
// Index route
app.get("/listings", async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("\listings/index.ejs", {allListings});
});

//New Route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;//id extract   //then parse the data using urlencoded
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//Create Route
app.post("/listings", async(req,res)=>{  //async as changing in database
    //let {title, description, price, location, country} = req.body; //destructuring
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});
//Edit Route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id} = req.params;//id extract   
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});
});

//Update Route
app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});//deconstructing the listing object
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("listing deleted");
    res.redirect("/listings");
});



// app.get("/testListing", async (req,res)=>{
//     let sampleListing = new Listing({ //Inserting
//         title: "My New Villa",
//         description: "At beach side",
//         price: 1200,
//         location: "Calangute goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("listing saved");
//     res.send("successfully testing ");
// });

app.listen(8080,()=>{
    console.log("server is listening on 8080");
});




