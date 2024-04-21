const express = require("express");
const {
  homepage,
  employeSignup,
  employeSignin,
  employeSignout,
  employeSendMail,
  employeForgetLink,
  employeResetPassword,
  employeUpdate,
  currentEmploye,
  employeAvtar,
  createInternship,
  readInternship,
  readSingleInternship,
  readJob,
  readSingleJob,
  createJob,
} = require("../controllers/employeControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, homepage);
router.post("/current", isAuthenticated, currentEmploye);

// // POST /student/signup

router.post("/signup", employeSignup);
router.post("/signin", employeSignin);
router.get("/signout", employeSignout);

// // send mail
router.post("/send-mail", employeSendMail);

// // Get /student/forget-link/:studentId
router.post("/forget-link", employeForgetLink);

// // Post /student/reset-password/:studentId
router.post("/reset-password/:id", isAuthenticated, employeResetPassword);

// // Post /student/update/:studentId

router.post("/update/:id", isAuthenticated, employeUpdate);

// // upload avtar
router.post("/avtar/:id", isAuthenticated, employeAvtar);


//  -----------------Internships---------------//

router.post("/internship/create", isAuthenticated, createInternship);

router.post("/internship/read", isAuthenticated, readInternship);

router.post("/internship/read/:id", isAuthenticated, readSingleInternship);



router.post("/job/create", isAuthenticated, createJob);

router.post("/job/read", isAuthenticated, readJob);

router.post("/job/read/:id", isAuthenticated, readSingleJob);







module.exports = router;
