const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const JobInfoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 3,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },
    jobContext: {
      type: String,
      minLength: 10,
      required: true,
    },

    employmentStatus: {
      type: String,
      enum: ["full-time", "part-time", "intern"],
      required: true,
    },
    eduRequirements: {
      type: String,
      required: true,
    },
    exRequirements: {
      type: String,
      required: true,
    },
    addRequirements: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    deadlineStart: {
      type: Date,
      required: true,
    },
    deadlineEnd: {
      type: Date,
      required: true,
    },
    managerId: {
      type: ObjectId,
      ref: "UserInfo",
    },
    applicants: [
      { type: ObjectId, index: true, unique: true, ref: "UserInfo" },
    ],
  },
  {
    timestamps: true,
  }
);

const JobInfo = mongoose.model("JobInfo", JobInfoSchema, "Jobs");

module.exports = JobInfo;
