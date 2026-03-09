import doctorModel from "../models/DoctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { analyzeUserMessage } from "../services/aiService.js";

export const chatbotHandler = async (req, res) => {

  try {

    const { message, userId } = req.body;

    const aiResult = await analyzeUserMessage(message);

    // SEARCH DOCTOR
    if (aiResult.intent === "doctor_search") {

      const doctors = await doctorModel.find({
        speciality: aiResult.speciality,
        available: true
      });

      return res.json({
        success: true,
        type: "doctor_list",
        doctors
      });
    }

    // BOOK APPOINTMENT
    if (aiResult.intent === "book_appointment") {

      const doctor = await doctorModel.findOne({
        speciality: aiResult.speciality,
        available: true
      });

      if (!doctor) {
        return res.json({
          success: false,
          message: "No doctor available"
        });
      }

      const slotDate = new Date().toDateString();
      const slotTime = "11:30 AM";

      const appointment = new appointmentModel({
        userId,
        docId: doctor._id,
        slotDate,
        slotTime,
        userData: {},
        docData: doctor,
        amount: doctor.fees,
        date: Date.now()
      });

      await appointment.save();

      return res.json({
        success: true,
        type: "appointment_booked",
        doctor: doctor.name,
        slotDate,
        slotTime
      });
    }

    // CAB SERVICE
    if (aiResult.intent === "cab_service") {

      return res.json({
        success: true,
        type: "cab_service",
        services: [
          { name: "Uber", link: "https://www.uber.com" },
          { name: "Rapido", link: "https://rapido.bike" }
        ]
      });
    }

    // LOCATION
    if (aiResult.intent === "hospital_location") {

      return res.json({
        success: true,
        type: "location",
        map: "https://www.google.com/maps/search/hospital+near+me"
      });
    }

    res.json({
      success: true,
      message: "Please provide more details."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Chatbot error"
    });

  }
};