/* Handle assignment uploads by users and actions by admins. */

const Assignment = require("../models/assignmentModel");

// Upload Assignment
exports.upload = async (req, res) => {
  const { task, admin } = req.body;
  const userId = req.user.id; // Extracted from JWT token
  try {
    const assignment = new Assignment({ userId, task, admin });
    await assignment.save();
    res.status(201).json({ msg: "Assignment submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Error submitting assignment" });
  }
};

// Admin views assignments tagged to them
exports.viewAssignments = async (req, res) => {
  const adminId = req.user.id;
  try {
    const assignments = await Assignment.find({ admin: adminId })
      .populate("userId", "name")
      .exec();
    res.json(assignments);
  } catch (err) {
    res.status(400).json({ error: "Error fetching assignments" });
  }
};

// Accept or reject assignment
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["accepted", "rejected"].includes(status))
    return res.status(400).json({ error: "Invalid status" });

  try {
    const assignment = await Assignment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: "Error updating status" });
  }
};
