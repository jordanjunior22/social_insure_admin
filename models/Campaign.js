const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const CampaignSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  raised: {
    type: Number,
    required: false,
    default: 0
  },
  fees: {
    type: Number,
    required: false,
    default: 0
  },
  description: {
    type: String,
    required: true,
  },
  featureType: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  feature_id: {
    type: Schema.Types.ObjectId,
    ref: 'Features',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageSource:{
    type: String,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
});

module.exports = models?.Campaign || model("Campaign", CampaignSchema);