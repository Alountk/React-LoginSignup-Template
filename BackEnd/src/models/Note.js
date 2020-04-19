const { Schema , model } = require('mongoose');

const noteSchema = new Schema({
    title:String,
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    author:String,
},{timestamps:true})

module.exports = model('Note', noteSchema)