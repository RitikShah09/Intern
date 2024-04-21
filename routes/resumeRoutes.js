const express = require("express");
const {
  resume,
  addEducation,
  editEducation,
  deleteEducation,
  addJob,
  editJob,
  deleteJob,
  addInternship,
  editInternship,
  deleteInternship,
  addResponsibilities,
  editResponsibilities,
  deleteResponsibilities,
  addCourses,
  editCourses,
  deleteCourses,
  addProject,
  editProject,
  deleteProject,
  addSkill,
  editSkill,
  deleteSkill,
  addAccomplishment,
  editAccomplishment,
  deleteAccomplishment
} = require("../controllers/resumeControllers");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticated, resume);

router.post("/add-edu", isAuthenticated, addEducation);
router.post("/edit-edu/:eduId", isAuthenticated, editEducation);

router.post("/delete-edu/:eduId", isAuthenticated, deleteEducation);

router.post("/add-job", isAuthenticated, addJob);
router.post("/edit-job/:jobId", isAuthenticated, editJob);
router.post("/delete-job/:jobId", isAuthenticated, deleteJob);

router.post("/add-internship", isAuthenticated, addInternship);
router.post("/edit-internship/:internshipId", isAuthenticated, editInternship);
router.post(
  "/delete-internship/:internshipId",
  isAuthenticated,
  deleteInternship
);

router.post("/add-responsibilities", isAuthenticated, addResponsibilities);
router.post(
  "/edit-responsibilities/:responsibilitiesId",
  isAuthenticated,
  editResponsibilities
);
router.post(
  "/delete-responsibilities/:responsibilitiesId",
  isAuthenticated,
  deleteResponsibilities
);

router.post("/add-courses", isAuthenticated, addCourses);
router.post(
  "/edit-courses/:courseId",
  isAuthenticated,
  editCourses
);
router.post(
  "/delete-courses/:courseId",
  isAuthenticated,
  deleteCourses
);


router.post("/add-project", isAuthenticated, addProject);
router.post("/edit-project/:projectId", isAuthenticated, editProject);
router.post("/delete-project/:projectId", isAuthenticated, deleteProject);


router.post("/add-skill", isAuthenticated, addSkill);
router.post("/edit-skill/:skillId", isAuthenticated, editSkill);
router.post("/delete-skill/:skillId", isAuthenticated, deleteSkill);


router.post("/add-accomplishment", isAuthenticated, addAccomplishment);
router.post("/edit-accomplishment/:accomplishmentId", isAuthenticated, editAccomplishment);
router.post("/delete-accomplishment/:accomplishmentId", isAuthenticated, deleteAccomplishment);

module.exports = router;
