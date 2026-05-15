const express = require("express");
const router = express.Router();
const {
  getDevotees,
  createDevotee,
  getDevoteeById,
  updateDevotee,
  deleteDevotee,
  importDevotee,
} = require("../controllers/devotees.controller");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/allowRoles");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.use(authMiddleware);

router
  .route("/:id")
  .get(getDevoteeById)
  .put(allowRoles("volunteer", "admin"), updateDevotee)s
  .delete(allowRoles("admin"), deleteDevotee);

router.use(allowRoles("volunteer", "admin"));

router.route("/").get(getDevotees).post(createDevotee);

router
  .route("/upload")
  .post(allowRoles("admin"), upload.single("file"), importDevotee);

module.exports = router;
