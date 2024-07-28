const mongoose = require("mongoose");
const { model, models, Schema } = mongoose; // CommonJS equivalent of named imports

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String, // Change type to 
    required:false,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  isAWellBeingSubscriber: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  balance: {
    type:Number,
    default: 0.0,
  },
  isBlackListed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

// Export the User model using CommonJS
module.exports = models?.User || model("User", userSchema);
