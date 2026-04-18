import mongoose from "mongoose";

const SignupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "E-mail is verplicht"],
    unique: true,
    lowercase: true,
    trim: true,
    // De match-regel controleert het format in de database
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Voer a.u.b. een geldig e-mailadres in"]
  },
  date: { type: Date, default: Date.now }
});

const Signup = mongoose.model("Signup", SignupSchema);

export default Signup;

