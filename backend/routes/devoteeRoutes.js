const express = require("express");
const router = express.Router();
const {
  getDevotees,
  createDevotee,
  getDevoteeById,
  updateDevotee,
  deleteDevotee,
} = require("../controllers/devoteeController");

router.route("/").get(getDevotees).post(createDevotee);
router
  .route("/:id")
  .get(getDevoteeById)
  .put(updateDevotee)
  .delete(deleteDevotee);

module.exports = router;
