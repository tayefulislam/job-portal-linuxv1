const {
  createJobService,
  managerJobsService,
  managerJobByIdService,
  getAllJobsService,
  getJobDetailsByIdService,
  applyInAJobService,
  checkDuplicateApply,
  managerUpdateJobDetailsService,
  topAppliedJobsService,
} = require("../Services/Jobs.Service");

exports.createJob = async (req, res) => {
  try {
    const job = req.body;
    const result = await createJobService(job);

    res.status(200).json({
      status: "success",
      message: "succesfuly posted new job",
      result: result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "job post unsuccessful",
      error: error.message,
    });
  }
};

exports.managerJobs = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(id);
    const jobs = await managerJobsService(id);
    res.status(200).json({
      status: "success",
      message: "getting jobs data successful",
      result: jobs,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Failed to load data",
      error: error.message,
    });
  }
};

exports.managerJobById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const job = await managerJobByIdService(id);
    res.status(200).json({
      status: "success",
      message: "getting jobs data successful",
      result: job,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Failed to load data",
      error: error.message,
    });
  }
};

exports.managerUpdateJobDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await managerUpdateJobDetailsService(id, updateData);
    res.status(200).json({
      status: "success",
      message: "Data Update Successfully",
      result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "failed to update data",
      error: error.message,
    });
  }
};

// candidate
exports.getAllJobs = async (req, res) => {
  try {
    const { location, jobType, salary, sort } = req.query;
    const query = {};
    // console.log(query);

    const sortBy = sort.split(",").join(" ");

    if (location) {
      query.location = location;
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (salary) {
      query.salary = { $gt: salary };
    }

    const job = await getAllJobsService(query, sortBy);
    res.status(200).json({
      status: "success",
      message: "getting jobs data successful",
      result: job,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Failed to load data",
      error: error.message,
    });
  }
};

exports.getJobDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getJobDetailsByIdService(id);
    res.status(200).json({
      status: "success",
      message: "successfully fetch data",
      result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "failed to load fetch data",
      error: error.message,
    });
  }
};

exports.applyInAJob = async (req, res) => {
  try {
    const { id: userID } = req.user;
    const { id: jobID } = req.params;

    const { allCandidate, isApplied } = await checkDuplicateApply(
      jobID,
      userID
    );

    const { deadlineEnd, deadlineStart } = allCandidate[0];

    const deadlineStartUnix = deadlineStart;
    const deadlineEndUnix = deadlineEnd.valueOf();
    const currentDate = new Date().valueOf();

    console.log("hello", currentDate);

    if (isApplied) {
      return res.status(401).json({
        status: "failed",
        message: "already applied",
      });
    }

    if (deadlineStartUnix > currentDate) {
      return res.status(401).json({
        status: "failed",
        message: "don't start yet",
      });
    }

    if (deadlineEndUnix < currentDate) {
      return res.status(401).json({
        status: "failed",
        message: "Time is up. Please try again leter",
      });
    }

    const result = await applyInAJobService(jobID, userID);
    res.status(200).json({
      status: "success",
      message: "successfully apply",
      result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "failed to load fetch data",
      error: error.message,
    });
  }
};

// extra route

exports.topAppliedJobs = async (req, res) => {
  try {
    const result = await topAppliedJobsService();
    res.status(200).json({
      status: "success",
      message: "successfully fetch data",
      result,
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "failed to load fetch data",
      error: error.message,
    });
  }
};
