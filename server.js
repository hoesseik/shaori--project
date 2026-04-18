// ---------------------------
// DOTENV & IMPORTS
// ---------------------------
import dotenv from "dotenv";
dotenv.config(); // Op Render worden variabelen automatisch geladen, dit is genoeg.

import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; // 👈 Nieuw: CORS import

import orderRoutes from "./routes/order.js";
import signupRoutes from "./routes/signup.js";
import { sendContactMail } from "./mail.js"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ---------------------------
// MIDDLEWARE
// ---------------------------
app.use(cors()); // 👈 Nieuw: Dit staat toe dat je frontend met je backend praat
app.use(express.json());

// Statische bestanden (Alleen nodig als je frontend ook op Render staat)
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// ---------------------------
// MONGOOSE CONNECTIE
// ---------------------------
const mongoURI = process.env.MONGO_URI; 

mongoose
  .connect(mongoURI) 
  .then(() => {
    console.log("✅ Mongoose verbonden met MongoDB Atlas!");
  })
  .catch((err) => console.log("❌ Mongoose verbindingsfout:", err));

// ---------------------------
// API ROUTES
// ---------------------------
app.use("/api", orderRoutes);
app.use("/api", signupRoutes);

// ---------------------------
// CONTACT ROUTE
// ---------------------------
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Alle velden zijn verplicht." });
  }
  try {
    await sendContactMail(name, email, message);
    res.status(201).json({ message: "Bericht succesvol verzonden!" });
  } catch (err) {
    console.error("❌ Fout in contact route:", err);
    res.status(500).json({ message: "Fout bij verzenden contact mail." });
  }
});

// ---------------------------
// PAGINA ROUTES
// ---------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(frontendPath, "product.html"));
});

// ---------------------------
// SERVER STARTEN
// ---------------------------
// Render gebruikt process.env.PORT, meestal poort 10000
const PORT = process.env.PORT || 10000; 
app.listen(PORT, () => {
  console.log(`🚀 Shaori server is LIVE op poort ${PORT}`);
});





