import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// 🔹 Transporter (OAuth2 of App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN
  }
});

// ------------------------------------------------------
// 1️⃣ Signup bevestiging
// ------------------------------------------------------
export async function sendSignupMail(email) {
  const mailOptions = {
    from: `"Shaori" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welkom bij Shaori",
    html: `
      <h2>Welkom bij Shaori</h2>
      <p>Bedankt voor je aanmelding! Je hoort snel meer van ons.</p>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Signup mail verstuurd naar:", email);
}

// ------------------------------------------------------
// 2️⃣ Contactformulier mail
// ------------------------------------------------------
export async function sendContactMail(name, email, message) {
  const mailOptions = {
    from: `"Shaori Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Nieuw bericht van ${name}`,
    html: `
      <h2>Nieuw contactbericht</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Bericht:</strong><br>${message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Contact mail ontvangen van:", email);
}

// ------------------------------------------------------
// 3️⃣ Order bevestiging (DIT ontbrak bij jou!)
// ------------------------------------------------------
export async function sendOrderMail(email, order) {
  const itemsHtml = order.items
    .map(
      (item) => `
      <li>
        ${item.qty}× ${item.name} — €${item.price}
      </li>
    `
    )
    .join("");

  const mailOptions = {
    from: `"Shaori" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Je Shaori bestelling is ontvangen",
    html: `
      <h2>Bedankt voor je bestelling!</h2>
      <p>We hebben je order succesvol ontvangen.</p>

      <h3>Bestelling:</h3>
      <ul>${itemsHtml}</ul>

      <p><strong>Totaal:</strong> €${order.total}</p>

      <p>We houden je op de hoogte van de verzending.</p>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log("📧 Order mail verstuurd naar:", email);
}





