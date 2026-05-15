const catchAsyncHandler = require("../middleware/catchAsyncHandler");
const Course = require("../models/Course.model");

exports.createCourse = catchAsyncHandler(async function (req, res) {
  const course = await Course.create(req.body);

  res
    .status(200)
    .json({ status: "success", data: course, message: "coure added" });
});

exports.getAllCourse = catchAsyncHandler(async function (req, res) {
  const courses = await Course.find();

  res.status(200).json({
    count: courses.length,
    data: courses,
    message: `${courses.length} courses fetched`,
  });
});

exports.updateCourse = catchAsyncHandler(async function (req, res) {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ status: "success", data: course });
});
