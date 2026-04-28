const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type : String,
        required : true,
    },
    description : String,
    image:{
        filename : String,
        url: {
            type : String,
            default : "https://media.houseandgarden.co.uk/photos/68931d43f078771e2eb18ba8/16:10/w_2560%2Cc_limit/Permit%2520Room%2520Portobello_Lodgings_Living%2520Room_3.jpg",//image undefined null//no option// set a default image if the user does not provide one//like in testing
            set: (v) => v ===""
            ? "https://unsplash.com/photos/lounge-chairs-and-umbrellas-on-a-sandy-beach-VPGXFMZuymU"
            : v, //image exist but link is empty // if the user provides an empty string, set it to the default image URL
        }  
    } ,
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
