const { ReturnDocument } = require("mongodb");
const JobInfo = require("../Models/JobInfo");

exports.createJobService = async (job) => {
  job.deadlineStart = new Date(job.deadlineStart);
  job.deadlineEnd = new Date(job.deadlineEnd);
  const result = await JobInfo.create(job);
  return result;
};

exports.managerJobsService = async (id) => {
  console.log(id);
  const result = await JobInfo.find({ "managerId.id": id });
  return result;
};

exports.managerJobByIdService = async (id) => {
  const result = await JobInfo.find({ _id: id })
    .populate("applicants")
    .sort({ _id: -1 });

  return result;
};

exports.managerUpdateJobDetailsService = async (id, updateData) => {
  const result = await JobInfo.updateOne({ _id: id }, updateData);
  return result;
};

// candidate services
exports.getAllJobsService = async (query) => {
  console.log(query);

  const result = await JobInfo.find(query).sort({ _id: -1 });

  return result;
};

exports.getJobDetailsByIdService = async (id) => {
  // console.log(id);

  // const date1 = new Date("2022-10-31");
  // const date = new Date(date1).valueOf();
  // console.log(date);

  const result = await JobInfo.findById({ _id: id }).populate("managerId.id");
  // console.log(result);
  return result;
};

exports.checkDuplicateApply = async (jobId, userID) => {
  // console.log(id);
  const allCandidate = await JobInfo.find({ _id: jobId }).select(
    "applicants deadlineStart deadlineEnd"
  );

  const isApplied = allCandidate[0].applicants.includes(userID);

  // console.log(applicants[0].applicants.toString());

  // const isApplied = applicants?.includes(userID);
  // console.log(result);
  return { allCandidate, isApplied };
};

exports.applyInAJobService = async (id, userID) => {
  const result = await JobInfo.updateOne(
    { _id: id },
    { $push: { applicants: userID } },
    { new: true, upsert: true }
  );

  return result;
};

// extra route

// exports.topAppliedJobsService = async () => {
//   console.log("hello");
//   const result = await JobInfo.find({'applicants':});
//   return result;
// };
