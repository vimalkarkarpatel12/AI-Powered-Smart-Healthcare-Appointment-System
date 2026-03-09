import cron from "node-cron";
import reminderModel from "../models/reminderModel.js";
import client from "../config/twilio.js";

cron.schedule("* * * * *", async () => {

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const reminders = await reminderModel.find({
    time: currentTime
  });

  reminders.forEach(async (reminder) => {

    await client.messages.create({
      body: `Reminder: Take your medicine ${reminder.medicineName} (${reminder.dosage})`,
      from: process.env.TWILIO_PHONE,
      to: reminder.phone
    });

  });

});