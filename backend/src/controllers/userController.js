import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";

// ============================================
// HARDCODED ADMIN CREDENTIALS
// ============================================
const ADMIN_CREDENTIALS = {
  email: "admin@jobportal.com",
  password: "Admin@123456",
  name: "Admin",
  role: "admin"
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Enter your name" });
    }

    if (!email) {
      return res.json({ success: false, message: "Enter your email" });
    }

    if (!password) {
      return res.json({ success: false, message: "Enter your password" });
    }

    if (!imageFile) {
      return res.json({ success: false, message: "Upload your image" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const imageUploadUrl = await cloudinary.uploader.upload(imageFile.path);

    const user = await User({
      name,
      email,
      password: hashedPassword,
      image: imageUploadUrl.secure_url,
    });

    await user.save();

    const token = await generateToken(user._id);

    return res.json({
      success: true,
      message: "Registration successful",
      userData: user,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Password is required" });
    }

    // ============================================
    // CHECK FOR ADMIN LOGIN
    // ============================================
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Generate special admin token with identifier
      const adminToken = await generateToken("ADMIN_SUPER_USER");
      
      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        userData: {
          _id: "ADMIN_SUPER_USER",
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role,
          isAdmin: true,
          image: "https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff&size=200&bold=true",
          phone: "",
          location: "System Administrator",
          bio: "System Administrator with full access privileges",
          jobTitle: "System Administrator",
          company: "Job Portal",
        },
        token: adminToken,
        isAdmin: true
      });
    }

    // ============================================
    // REGULAR USER LOGIN
    // ============================================
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    const token = await generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userData: user,
      token,
      isAdmin: false
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const userData = req.userData;

    return res.status(200).json({
      success: true,
      message: "user data fetched successfully",
      userData,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "user data fetched failed",
      userData,
    });
  }
};

// NEW: Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userData._id;
    
    // Prevent admin profile from being edited
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(403).json({
        success: false,
        message: "Admin profile cannot be edited",
      });
    }
    
    const {
      name,
      phone,
      location,
      bio,
      jobTitle,
      company,
      website,
      linkedin,
      twitter,
      github,
      skills,
      experience,
      education,
      certifications,
      languages,
    } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (location !== undefined) user.location = location;
    if (bio !== undefined) user.bio = bio;
    if (jobTitle !== undefined) user.jobTitle = jobTitle;
    if (company !== undefined) user.company = company;
    if (website !== undefined) user.website = website;
    if (linkedin !== undefined) user.linkedin = linkedin;
    if (twitter !== undefined) user.twitter = twitter;
    if (github !== undefined) user.github = github;

    // Parse arrays if they come as strings
    if (skills !== undefined) {
      user.skills = Array.isArray(skills) ? skills : JSON.parse(skills || "[]");
    }
    if (experience !== undefined) {
      user.experience = Array.isArray(experience)
        ? experience
        : JSON.parse(experience || "[]");
    }
    if (education !== undefined) {
      user.education = Array.isArray(education)
        ? education
        : JSON.parse(education || "[]");
    }
    if (certifications !== undefined) {
      user.certifications = Array.isArray(certifications)
        ? certifications
        : JSON.parse(certifications || "[]");
    }
    if (languages !== undefined) {
      user.languages = Array.isArray(languages)
        ? languages
        : JSON.parse(languages || "[]");
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userData: user,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// NEW: Update profile image
export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.userData._id;
    const imageFile = req.file;

    // Prevent admin image from being changed
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(403).json({
        success: false,
        message: "Admin profile image cannot be changed",
      });
    }

    if (!imageFile) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload new image to Cloudinary
    const imageUploadUrl = await cloudinary.uploader.upload(imageFile.path);

    user.image = imageUploadUrl.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      imageUrl: user.image,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile image",
    });
  }
};

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.userData._id;

    // Prevent admin from applying to jobs
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot apply to jobs",
      });
    }

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Job ID are required",
      });
    }

    const isAlreadyApplied = await JobApplication.findOne({ userId, jobId });

    if (isAlreadyApplied) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const jobApplication = new JobApplication({
      jobId,
      userId,
      companyId: jobData.companyId,
      date: new Date(),
    });

    await jobApplication.save();

    // Increment applications count
    await User.findByIdAndUpdate(userId, {
      $inc: { applicationsCount: 1 },
    });

    return res.status(201).json({
      success: true,
      message: "Job applied successfully",
      jobApplication,
    });
  } catch (error) {
    console.error("Job application error:", error);

    return res.status(500).json({
      success: false,
      message: "Job application failed",
    });
  }
};

export const getUserAppliedJobs = async (req, res) => {
  try {
    const userId = req.userData._id;

    // Admin has no applications
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(200).json({
        success: true,
        message: "Admin has no job applications",
        jobApplications: [],
      });
    }

    const application = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title location date status");

    return res.status(200).json({
      success: true,
      message: "Jobs application fetched successfully",
      jobApplications: application,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs application",
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userData._id;
    const resumeFile = req.file;

    // Prevent admin from uploading resume
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot upload resume",
      });
    }

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload resume to Cloudinary as raw file
    const uploadedResume = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    userData.resume = uploadedResume.secure_url;
    userData.resumeUrl = uploadedResume.secure_url;
    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl: userData.resume,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resume",
    });
  }
};

// NEW: Increment profile views
export const incrementProfileViews = async (req, res) => {
  try {
    const { userId } = req.params;

    // Don't count views for admin
    if (userId === "ADMIN_SUPER_USER") {
      return res.status(200).json({
        success: true,
        message: "Admin profile view not counted",
      });
    }

    await User.findByIdAndUpdate(userId, {
      $inc: { profileViews: 1 },
    });

    return res.status(200).json({
      success: true,
      message: "Profile view recorded",
    });
  } catch (error) {
    console.error("Profile view error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to record profile view",
    });
  }
};