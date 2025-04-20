const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/", auth, async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user });
  res.json(jobs);
});


router.post("/", auth, async (req, res) => {
  const { title, company, description } = req.body;
  const job = await Job.create({ title, company, description, createdBy: req.user });
  res.status(201).json(job);
});

// DELETE: Remove job
router.delete("/:id", auth, async (req, res) => {
  await Job.deleteOne({ _id: req.params.id, createdBy: req.user });
  res.json({ message: "Job deleted" });
});

// PUT: Edit job (optional)
router.put("/:id", auth, async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user },
    req.body,
    { new: true }
  );
  res.json(job);
});

module.exports = router;
