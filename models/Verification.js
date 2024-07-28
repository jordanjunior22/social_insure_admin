const mongoose = require("mongoose");
const { model, models, Schema } = mongoose; // CommonJS equivalent of named imports

const verificationSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    idImageUrl: {
      type: String,
      required: true,
    },
    verificationMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Not Started', 'Approved', 'Rejected'], // Include 'Not Started'
      default: 'Not Started', // Default status set to 'Not Started'
  },
    subscriptionFee: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Export the Verification model using CommonJS
  module.exports = models?.Verification || model("Verification", verificationSchema);
  