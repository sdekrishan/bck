const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
    userID:{
        type:String,
    },
    restro:{
     type:{
        name:String,
        offers:String,
        rating:String,
        img_src:String,
        bought:String,
        address:String
     }
    },
    deals:{
        type:[
            {
                name:String,
                tag:String,
                bought:String,
                discount:String,
                price:String,
                discouted_price:String,
            }
        ]
    },
    resamt:Number,
    dealamt:Number,
});

const PaymentModel = mongoose.model("payment",PaymentSchema);

module.exports={PaymentModel}
