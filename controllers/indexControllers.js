const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodeMailer");
const { sendToken } = require("../utils/sendToken");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");

const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json('Welcome API Is Working');
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
  res.json(student);
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendToken(student, 201, res);
});

exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email: email })
    .select("+password")
    .exec();
  if (!student) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }

  const isMatch = await student.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials"));
  }
  sendToken(student, 201, res);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully Singed Out!" });
});

exports.studentSendMail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }

  const otp = Math.floor(Math.random() * 9000 + 1000);

  sendMail(req, res, next, otp);
  student.resetPasswordToken = otp;
  await student.save();

  res.json({ message: "Mail Sent successfully check your inbox" });
});

exports.studentForgetLink = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();
  if (!student) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }
  if (student.resetPasswordToken == req.body.otp) {
    student.resetPasswordToken = null;
    student.resetPasswordExpire = null;
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try Again", 404)
    );
  }
  res.status(200).json({ message: "Password Has Been Successfully Changed" });
});

exports.studentResetPassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.password = req.body.password;
  await student.save();
  sendToken(student, 201, res);
});

exports.studentUpdate = catchAsyncErrors(async (req, res, next) => {
  await Student.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "Student Updated Successfully",
  });
});

exports.studentAvtar = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avtar;
  const modifiedFileName = `resumeBuilder-${Date.now}${path.extname(
    file.name
  )}`;
  if (student.avatar.fileId !== "") {
    await imageKit.deleteFile(student.avatar.fileId);
  }
  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  student.avatar = { fileId, url };
  await student.save();
  res.status(200).json({ success: true, message: "Profile Updated" });
});

// ------------apply job ------------
exports.applyInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipId).exec();
  student.internships.push(internship._id);
  internship.students.push(student._id);
  await student.save();
  await internship.save();
  res.json(student);
});

exports.applyJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobId).exec();
  student.jobs.push(job._id);
  job.students.push(student._id);
  await student.save();
  await job.save();
  res.status(200).json(student);
});

// read all jobs and inernship
exports.allInternship = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().exec();
  res.status(200).json({ internships });
});

exports.allJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().exec();
  res.status(200).json({ jobs });
});
