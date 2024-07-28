const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const contributionSchema = new Schema({
  campaign_id: {
    type: Schema.Types.ObjectId,
    ref: 'Campaign', // Reference to the Campaign model
    required: true,
  },
  campaign_title: {
    type: String,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  fullName: {
    type:String,
    required:true
  }, // Adding the fullName field
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  paymentId: {
    type:String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = models?.Contribution || model("Contribution", contributionSchema);
