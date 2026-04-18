import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: [true, "Producten zijn verplicht"]
  },
  total: {
    type: Number,
    required: [true, "Totaalbedrag is verplicht"]
  },
  customer: {
    name: { 
      type: String, 
      required: [true, "Naam van de klant is verplicht"],
      trim: true 
    },
    email: { 
      type: String, 
      required: [true, "E-mailadres is verplicht"],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Voer een geldig e-mailadres in"]
    },
    address: { 
      type: String, 
      required: [true, "Adres is verplicht"],
      trim: true 
    }
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending"
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Belangrijk: Export met hoofdletter "Order"
const Order = mongoose.model("Order", OrderSchema);
export default Order;




