const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobCategories,
  getJobById,
} = require("../controllers/jobs");

router.post("/", auth, createJob);
router.get("/", auth, getJobs);
router.get("/categories", auth, getJobCategories);
router.put("/:id", auth, updateJob);
router.get("/:id", getJobById);
router.delete("/:id", auth, deleteJob);

module.exports = router;
