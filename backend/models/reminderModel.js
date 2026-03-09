import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  medicineName: {
    type: String,
    required: true
  },

  dosage: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

const reminderModel =
  mongoose.models.reminder ||
  mongoose.model("reminder", reminderSchema);

export default reminderModel;