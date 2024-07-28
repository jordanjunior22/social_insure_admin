const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const sponsorSchema = new Schema({
    imageSource: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  });

module.exports = models?.Sponsor || model("Sponsor", sponsorSchema);
