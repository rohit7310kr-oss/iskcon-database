const express = require("express");
const {
  createCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");

const router = express.Router();

router.route("/").post(createCourse).get(getAllCourse);

router.route("/:id").patch(updateCourse).delete(deleteCourse);

module.exports = router;
