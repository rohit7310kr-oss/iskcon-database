const express = require("express");
const router = express.Router();
const {
  getDevotees,
  createDevotee,
  getDevoteeById,
  updateDevotee,
  deleteDevotee,
} = require("../controllers/devotees.controller");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/allowRoles");

router.use(authMiddleware);

router
  .route("/:id")
  .get(getDevoteeById)
  .put(allowRoles("volunteer", "admin"), updateDevotee)
  .delete(allowRoles("admin"), deleteDevotee);

router.use(allowRoles("volunteer", "admin"));

router.route("/").get(getDevotees).post(createDevotee);

module.exports = router;
