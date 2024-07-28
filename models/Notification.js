const mongoose = require("mongoose");
const { model, models, Schema } = mongoose;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = models?.Notification || model("Notification", notificationSchema);
