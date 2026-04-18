// ---------------------------
// DOTENV (GEFORCEERD PAD)
// ---------------------------
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

// ---------------------------
// IMPORTS
// ---------------------------
import express from "express";
import mongoose from "mongoose";

import orderRoutes from "./routes/order.js";
import signupRoutes from "./routes/signup.js";
import { sendContactMail } from "./mail.js"; 

const app = express();

// ---------------------------
// MIDDLEWARE & STATIC FILES
// ---------------------------
app.use(express.json());

const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// ---------------------------
// MONGOOSE CONNECTIE
// ---------------------------
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shaori_db"; // Fallback naar lokaal als .env mist

mongoose
  .connect(mongoURI) 
  .then(() => {
    console.log("✅ Mongoose verbonden!");
    console.log(`db: ${mongoose.connection.name}`); // 👉 Dit vertelt ons de naam van de database
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

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.get("/product", (req, res) => {
  res.sendFile(path.join(frontendPath, "product.html"));
});

// ---------------------------
// SERVER STARTEN
// ---------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Shaori server draait op http://localhost:${PORT}`);
});






