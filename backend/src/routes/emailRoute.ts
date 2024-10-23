import express from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Define the route to send email
router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to: to || "default@example.com",
    from: "clara.prioux@chasacademy.se",
    subject: subject || "Sending with SendGrid is Fun",
    text: text || "and easy to do anywhere, even with Node.js",
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error sending email" });
  }
});

export default router;
