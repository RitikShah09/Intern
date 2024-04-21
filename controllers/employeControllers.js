const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { sendMail } = require("../utils/nodeMailer");
const { sendToken } = require("../utils/sendToken");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");
const Employe = require("../models/employeModel");
const Internship = require("../models/internshipModel");

const Job = require("../models/jobModel");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Employe HomePage" });
});

exports.currentEmploye = catchAsyncErrors(async (req, res, next) => {
  const student = await Employe.findById(req.id).exec();
  res.json(student);
});

exports.employeSignup = catchAsyncErrors(async (req, res, next) => {
  const employe = await new Employe(req.body).save();
  sendToken(employe, 201, res);
});

exports.employeSignin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  const employe = await Employe.findOne({ email: email })
    .select("+password")
    .exec();
  if (!employe) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }

  const isMatch = await employe.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials"));
  }
  sendToken(employe, 201, res);
});

exports.employeSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.json({ message: "Successfully Singed Out!" });
});

exports.employeSendMail = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();
  if (!employe) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }
  const url = Math.floor(Math.random() * 9000 + 1000);

  sendMail(req, res, next, url);
  employe.resetPasswordToken = url;
  await employe.save();

  res.json({ message: "Mail Sent successfully check your inbox" });
});

exports.employeForgetLink = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findOne({ email: req.body.email }).exec();
  if (!employe) {
    return next(new ErrorHandler("User Not Found With This Email Address"));
  }
  if (employe.resetPasswordToken == req.body.otp) {
    employe.resetPasswordToken == "";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link Please Try Again", 404)
    );
  }
  res.status(200).json({ message: "Password Has Been Successfully Changed" });
});

exports.employeResetPassword = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  employe.password = req.body.password;
  await employe.save();
  sendToken(employe, 201, res);
});

exports.employeUpdate = catchAsyncErrors(async (req, res, next) => {
  await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
  res.status(200).json({
    success: true,
    message: "employe Updated Successfully",
  });
});

exports.employeAvtar = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.params.id).exec();
  const file = req.files.organizationLogo;
  const modifiedFileName = `resumeBuilder-${Date.now}${path.extname(
    file.name
  )}`;
  if (employe.organizationLogo.fileId !== "") {
    await imageKit.deleteFile(employe.organizationLogo.fileId);
  }
  const { fileId, url } = await imageKit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  employe.organizationLogo = { fileId, url };
  await employe.save();
  res.status(200).json({ success: true, message: "Profile Updated" });
});

// createInternship

exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const internship = await new Internship(req.body);
  internship.employe = employe._id;
  employe.internships.push(internship._id);
  await employe.save();
  await internship.save();
  res.status(200).json({ success: true, internship });
});

exports.readInternship = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employe.findById(req.id).populate(
    "internships"
  );
  res.status(200).json({ success: true, internships });
});

exports.readSingleInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id);
  if (!internship) {
    return new ErrorHandler("Internship Not Found");
  }
  res.status(200).json({ success: true, internship });
});

// job
exports.createJob = catchAsyncErrors(async (req, res, next) => {
  const employe = await Employe.findById(req.id).exec();
  const job = await new Job(req.body);
  job.employe = employe._id;
  employe.jobs.push(job._id);
  await employe.save();
  await job.save();
  res.status(200).json({ success: true, job });
});

exports.readJob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employe.findById(req.id).populate("jobs");
  res.status(200).json({ success: true, jobs });
});

exports.readSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return new ErrorHandler("job Not Found");
  }
  res.status(200).json({ success: true, job });
});
