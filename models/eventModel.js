const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
  name:{
    type:String,
    required: true
  },
    phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hobbies: {
    type: String,
    
    required: true
  },
  user_id:{
     type:String,
     required:true
  }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)