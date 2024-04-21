const mongoose = require("mongoose");

const jobModel = new mongoose.Schema(
  {
    students: [{ type: mongoose.Schema.ObjectId, ref: "student" }],
    employe: { type: mongoose.Schema.ObjectId, ref: "employe" },
    title: String,
    Skills: String,
    jobType: { type: String, enum: ["In Office", "Remote"] },
    openings: Number,
    descripions: String,
    salary: Number,
    perks: String,
    assements: String,
    preferences: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("job", jobModel);

module.exports = Job;
