// routes/adminRoutes.js
import express from 'express';
import userAuthMiddleware from '../middleware/userAuthMiddleware.js';

const router = express.Router();

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.userData._id !== "ADMIN_SUPER_USER") {
    return res.status(403).json({ 
      success: false, 
      message: "Admin access required" 
    });
  }
  next();
};

// Admin routes
router.get('/stats', userAuthMiddleware, requireAdmin, getAdminStats);
router.get('/users', userAuthMiddleware, requireAdmin, getAllUsers);
router.delete('/users/:id', userAuthMiddleware, requireAdmin, deleteUser);
router.get('/all-applications', userAuthMiddleware, requireAdmin, getAllApplications);
router.patch('/jobs/:id/status', userAuthMiddleware, requireAdmin, updateJobStatus);

export default router;