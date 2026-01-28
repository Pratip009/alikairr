import express from "express";
import {
  registerUser,
  loginUser,
  fetchUserData,
  applyJob,
  getUserAppliedJobs,
  uploadResume,
  updateUserProfile,
  updateProfileImage,
  incrementProfileViews,
} from "../controllers/userController.js";
import upload from "../utils/upload.js";
import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/register-user", upload.single("image"), registerUser);
router.post("/login-user", loginUser);

// Profile routes
router.get("/user-data", userAuthMiddleware, fetchUserData);
router.put("/update-profile", userAuthMiddleware, updateUserProfile);
router.put("/update-image", userAuthMiddleware, upload.single("image"), updateProfileImage);
router.post("/increment-views/:userId", incrementProfileViews);

// Job application routes
router.post("/apply-job", userAuthMiddleware, applyJob);
router.post("/get-user-applications", userAuthMiddleware, getUserAppliedJobs);

// Resume routes
router.post("/upload-resume", userAuthMiddleware, upload.single("resume"), uploadResume);

export default router;