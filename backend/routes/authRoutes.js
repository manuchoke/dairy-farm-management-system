const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { protect } = require('../middleware/auth');

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/verify-otp", authController.verifyOTP);
router.patch("/reset-password/:token", authController.resetPassword);

// Protected routes
router.get("/verify", protect, authController.verifyToken);
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.delete('/delete-account', protect, authController.deleteAccount);

module.exports = router;