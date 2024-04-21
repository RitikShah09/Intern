const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const employeModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name Is Required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name Is Required"],
    },
    contact: {
      type: String,
      required: [true, "Contact Is Required"],
      maxLength: [10, "Contact should not exceed more than 10 Numbers"],
      minLength: [10, "Contact should have atleast 10 Number"],
    },
    email: {
      type: String,
      required: [true, "Email Is Required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      maxLength: [15, "Password should not exceed more than 15 characters"],
      minLength: [6, "Password should have atleast 6 characters"],
      //   match : []
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },
    resetPasswordExpire: Date,
    organizationLogo: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1695802060198-c735209f8e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",
      },
    },

    organizationName: {
      type: String,
      required: [true, "Organization Name Is Required"],
    },
    internships: [{ type: mongoose.Schema.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.ObjectId, ref: "job" }],
  },
  { timestamps: true }
);

employeModel.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

employeModel.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

employeModel.methods.getJwtoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Employe = mongoose.model("employe", employeModel);

module.exports = Employe;
