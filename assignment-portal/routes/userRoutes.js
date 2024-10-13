const express = require("express");
const { register, login } = require("../controllers/authController");
const { upload } = require("../controllers/assignmentController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/upload", auth, upload);

module.exports = router;
