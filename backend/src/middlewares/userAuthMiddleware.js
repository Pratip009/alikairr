import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized login again" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ============================================
    // CHECK IF ADMIN USER
    // ============================================
    if (decodedToken.id === "ADMIN_SUPER_USER") {
      // Return admin user data
      req.userData = {
        _id: "ADMIN_SUPER_USER",
        name: "Admin",
        email: "admin@jobportal.com",
        role: "admin",
        isAdmin: true,
        image: "https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff&size=200&bold=true",
        phone: "",
        location: "System Administrator",
        bio: "System Administrator with full access privileges",
        jobTitle: "System Administrator",
        company: "Job Portal",
      };
      return next();
    }

    // ============================================
    // REGULAR USER AUTHENTICATION
    // ============================================
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.userData = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized login again" });
  }
};

export default userAuthMiddleware;