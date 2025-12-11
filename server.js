const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("DB Error:", err));


const advocateSchema = new mongoose.Schema({
  fullName: String,
  contactNumber: String,
  email: String,
  graduationYear: String,
  experience: String,
  currentlyEmployed: String,
  location: String,
  timeCommitment: String,
  barNumber: String,
  fieldVisits: String,
  submittedAt: { type: Date, default: Date.now }
});

const Advocate = mongoose.model("Advocate", advocateSchema);

app.post("/api/advocate/register", async (req, res) => {
  try {
    const data = new Advocate(req.body);
    await data.save();

    res.json({
      success: true,
      message: "Registration submitted successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    });
  }
});
// =============================
// CONTACT FORM SCHEMA
// =============================
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  submittedAt: { type: Date, default: Date.now }
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

// =============================
// CONTACT FORM API
// =============================
app.post("/send-message", async (req, res) => {
  try {
    const message = new ContactMessage(req.body);
    await message.save();

    res.json({
      success: true,
      message: "Message sent successfully! We will contact you soon."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again."
    });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
