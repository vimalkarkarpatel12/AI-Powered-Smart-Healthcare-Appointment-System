import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeUserMessage = async (message) => {

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are an AI assistant for a doctor appointment system.

Return JSON only.

Possible intents:
doctor_search
book_appointment
cab_service
hospital_location

Example:
{
 "intent":"book_appointment",
 "speciality":"Dermatologist",
 "date":"tomorrow"
}
`
      },
      {
        role: "user",
        content: message
      }
    ]
  });

  return JSON.parse(completion.choices[0].message.content);
};