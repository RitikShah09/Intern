const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.ObjectId, ref: "employe" },
    profile: String,
    Skills: String,
    internshipType: { type: String, enum: ["In Office", "Remoe"] },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
      status: {
        type: String,
        enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"],
      },
      amount: Number,
    },
    perks: String,
    assements: String,
  },
  { timestamps: true }
);

const Internship = mongoose.model("internship", internshipModel);

module.exports = Internship;
