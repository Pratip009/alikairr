import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
  title: { type: String, default: "" },
  company: { type: String, default: "" },
  period: { type: String, default: "" },
  description: { type: String, default: "" }
});

const educationSchema = mongoose.Schema({
  degree: { type: String, default: "" },
  institution: { type: String, default: "" },
  year: { type: String, default: "" }
});

const languageSchema = mongoose.Schema({
  name: { type: String, default: "" },
  proficiency: { type: String, default: "" }
});

const userSchema = mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  
  // Role & Admin
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isAdmin: { type: Boolean, default: false },
  
  // Contact Info
  phone: { type: String, default: "" },
  location: { type: String, default: "" },
  
  // Professional Info
  bio: { type: String, default: "" },
  jobTitle: { type: String, default: "" },
  company: { type: String, default: "" },
  
  // Social Links
  website: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  twitter: { type: String, default: "" },
  github: { type: String, default: "" },
  
  // Skills & Qualifications
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  
  // Experience & Education
  experience: { type: [experienceSchema], default: [] },
  education: { type: [educationSchema], default: [] },
  languages: { type: [languageSchema], default: [] },
  
  // Resume
  resume: { type: String, default: "" },
  resumeUrl: { type: String, default: "" },
  
  // Account Stats (optional)
  memberSince: { type: Date, default: Date.now },
  applicationsCount: { type: Number, default: 0 },
  profileViews: { type: Number, default: 0 }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const User = mongoose.model("User", userSchema);

export default User;