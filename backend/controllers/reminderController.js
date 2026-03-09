import reminderModel from "../models/reminderModel.js";

export const addReminder = async (req, res) => {

  try {

    const { userId, medicineName, dosage, time, phone } = req.body;

    const reminder = new reminderModel({
      userId,
      medicineName,
      dosage,
      time,
      phone
    });

    await reminder.save();

    res.json({
      success: true,
      message: "Reminder added successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error creating reminder"
    });

  }

};