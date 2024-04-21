const express = require("express");
const {
  homepage,
  studentSignup,
  studentSignin,
  studentSignout,
  studentSendMail,
  currentUser,
  studentForgetLink,
  studentResetPassword,
  studentUpdate,
  studentAvtar,
  applyInternship,
  applyJob,
  allInternship,
  allJob,
} = require("../controllers/indexControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", homepage);

// POST /student
router.post("/student", isAuthenticated, currentUser);

// POST /student/signup

router.post("/student/signup", studentSignup);
router.post("/student/signin", studentSignin);
router.get("/student/signout", studentSignout);

// send mail
router.post("/student/send-mail", studentSendMail);

// Get /student/forget-link/:studentId
router.post("/student/forget-link", studentForgetLink);

// Post /student/reset-password/:studentId
router.post(
  "/student/reset-password/:id",
  isAuthenticated,
  studentResetPassword
);

// Post /student/update/:studentId

router.post("/student/update/:id", isAuthenticated, studentUpdate);

// upload avtar
router.post("/student/avtar/:id", isAuthenticated, studentAvtar);


//  -----------Apply Job --------------//

router.post("/student/apply/internship/:internshipId", isAuthenticated, applyInternship);
router.post("/student/apply/job/:jobId", isAuthenticated, applyJob);

router.post(
  "/student/allinternship",
  isAuthenticated,
  allInternship
);

router.post("/student/alljob", isAuthenticated, allJob);



module.exports = router;
