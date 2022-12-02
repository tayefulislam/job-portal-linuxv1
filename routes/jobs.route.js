const express = require("express");

const router = express.Router();

const JobsController = require("../Controllers/Jobs.Controller");
const { verifyToken } = require("../middlewares/verifyToken");

// mamager and candidate route

router
  .route("/jobs")
  .post(JobsController.createJob)
  .get(JobsController.getAllJobs);

// extra

router.route("/jobs/topApplied").get(JobsController.topAppliedJobs);
// candidate route
router.route("/jobs/:id/apply").get(verifyToken, JobsController.applyInAJob);

// candidate and manager route
router
  .route("/jobs/:id")
  .get(JobsController.getJobDetailsById)
  .patch(JobsController.managerUpdateJobDetails);

// manager routes
router.route("/manager/jobs").get(verifyToken, JobsController.managerJobs);
router
  .route("/manager/jobs/:id")
  .get(verifyToken, JobsController.managerJobById);

module.exports = router;
