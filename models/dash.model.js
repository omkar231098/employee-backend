const mongoose = require("mongoose");


const DashSchema = mongoose.Schema({
  
    firstName:String,
    lastName : String,
    email: String,
    department : {type:String,
        enum:["Tech", "Marketing", "Operations"]
        },
    salary:Number
   
});


const DashModel = mongoose.model("DashData", DashSchema);
module.exports = { DashModel };
