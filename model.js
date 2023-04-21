const mongoose = require("mongoose")

const schema = mongoose.Schema;

var pizzaSchema = new schema({
    Pizza_name:{
        type: String,
        required: true,
        unique: true
    },
    description: String,
    price:{
        type: Number,
        required: true
    }   
})

module.exports = mongoose.model("PIzzaTypes",pizzaSchema)