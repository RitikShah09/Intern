const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");
exports.resume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "Secure Resume Page", resume });
});

exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Education Added!" });
});

exports.editEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id == req.params.eduId
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Updated!" });
});

exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const education = student.resume.education.filter(
    (i) => i.id !== req.params.eduId
  );
  student.resume.education = education;
  await student.save();
  res.json({ message: "Education Deleted!" });
});
//

exports.addJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Job Added!" });
});

exports.editJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id == req.params.jobId
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Job Updated!" });
});

exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobs = student.resume.jobs.filter((i) => i.id !== req.params.jobId);
  student.resume.jobs = jobs;
  await student.save();
  res.json({ message: "Job Deleted!" });
});

//

exports.addInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Internship Added!" });
});

exports.editInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internshipIndex = student.resume.internships.findIndex(
    (i) => i.id == req.params.internshipId
  );
  student.resume.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Internship Updated!" });
});

exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internships = student.resume.internships.filter(
    (i) => i.id !== req.params.internshipId
  );
  student.resume.internships = internships;
  await student.save();
  res.json({ message: "Internship Deleted!" });
});
//

exports.addResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Responsibilities Added!" });
});

exports.editResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilitiesIndex = student.resume.responsibilities.findIndex(
    (i) => i.id == req.params.responsibilitiesId
  );
  student.resume.responsibilities[responsibilitiesIndex] = {
    ...student.resume.responsibilities[responsibilitiesIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Responsibilities Updated!" });
});

exports.deleteResponsibilities = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const responsibilities = student.resume.responsibilities.filter(
    (i) => i.id !== req.params.responsibilitiesId
  );
  student.resume.responsibilities = responsibilities;
  await student.save();
  res.json({ message: "Responsibilities Deleted!" });
});


// 
exports.addCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Courses Added!" });
});

exports.editCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const coursesIndex = student.resume.courses.findIndex(
    (i) => i.id == req.params.courseId
  );
  student.resume.courses[coursesIndex] = {
    ...student.resume.courses[coursesIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Courses Updated!" });
});

exports.deleteCourses = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courses = student.resume.courses.filter(
    (i) => i.id !== req.params.courseId
  );
  student.resume.courses = courses;
  await student.save();
  res.json({ message: "Courses Deleted!" });
});

//

exports.addProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Project Added!" });
});

exports.editProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectsIndex = student.resume.projects.findIndex(
    (i) => i.id == req.params.projectId
  );
  student.resume.projects[projectsIndex] = {
    ...student.resume.projects[projectsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Project Updated!" });
});

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projects = student.resume.projects.filter(
    (i) => i.id !== req.params.projectId
  );
  student.resume.projects = projects;
  await student.save();
  res.json({ message: "Project Deleted!" });
});

// //////
exports.addSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skill Added!" });
});

exports.editSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillsIndex = student.resume.skills.findIndex(
    (i) => i.id == req.params.skillId
  );
  student.resume.skills[skillsIndex] = {
    ...student.resume.skills[skillsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skill Updated!" });
});

exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skills = student.resume.skills.filter(
    (i) => i.id !== req.params.skillId
  );
  student.resume.skills = skills;
  await student.save();
  res.json({ message: "Skill Deleted!" });
});

;


exports.addAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Accomplishment Added!" });
});

exports.editAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishmentsIndex = student.resume.accomplishments.findIndex(
    (i) => i.id == req.params.accomplishmentId
  );
  student.resume.accomplishments[accomplishmentsIndex] = {
    ...student.resume.accomplishments[accomplishmentsIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Accomplishment Updated!" });
});

exports.deleteAccomplishment = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const accomplishments = student.resume.accomplishments.filter(
    (i) => i.id !== req.params.accomplishmentId
  );
  student.resume.accomplishments = accomplishments;
  await student.save();
  res.json({ message: "Accomplishment Deleted!" });
});
