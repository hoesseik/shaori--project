import express from "express";
import Signup from "../models/Signup.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  // Email opschonen (kleine letters en spaties verwijderen)
  const email = req.body.email ? req.body.email.toLowerCase().trim() : null;

  console.log("-----------------------------------------");
  console.log("📩 Nieuwe aanvraag voor:", email);

  if (!email) {
    return res.status(400).json({ message: "E‑mail is verplicht." });
  }

  try {
    // 1. Controleer eerst handmatig op dubbelen (vriendelijke check)
    const existing = await Signup.findOne({ email });
    if (existing) {
      console.log(`ℹ️ Dubbele aanmelding geblokkeerd: ${email}`);
      return res.status(409).json({ message: "Je staat al op de lijst! 🌸" });
    }

    // 2. Opslaan in MongoDB Atlas
    // Jouw model (Signup.js) checkt hier ook nogmaals de 'match' (regex)
    await Signup.create({ email });
    console.log(`✅ DATABASE: Opgeslagen: ${email}`);

    // 3. Nodemailer instellen
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
      },
    });

    // 4. Bevestigingsmail versturen
    try {
      await transporter.sendMail({
        from: `"Shaori" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welkom bij Shaori 🌸",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
            <h2 style="color: #d14d72;">Welkom bij Shaori 🌸</h2>
            <p>Bedankt voor je interesse! Je bent nu officieel aangemeld voor onze nieuwsbrief.</p>
            <p>Met vriendelijke groet,<br><strong>Het Shaori Team</strong></p>
          </div>
        `
      });
      console.log(`📧 MAIL: Verzonden naar ${email}`);
    } catch (mailError) {
      console.error("❌ MAIL FOUT:", mailError.message);
      // We gaan door, want de opslag in de database was al gelukt!
    }

    // 5. Alles gelukt!
    return res.status(201).json({ message: "Bedankt! Je bent succesvol aangemeld 🌸" });

  } catch (err) {
    // Hier vangen we de foutmeldingen van je Model (Signup.js) op
    if (err.name === 'ValidationError') {
      console.log("⚠️ Validatie fout:", err.message);
      return res.status(400).json({ message: "Voer a.u.b. een geldig e-mailadres in." });
    }

    if (err.code === 11000) {
      return res.status(409).json({ message: "Dit e-mailadres is al bekend." });
    }

    console.error("❌ SERVER FOUT:", err);
    return res.status(500).json({ message: "Er ging iets mis bij de verwerking." });
  }
});

export default router;
