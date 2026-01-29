// routes/contactRoutes.js
import express from 'express';
import { submitContactForm, getAllContactMessages } from '../controllers/contactController-groq.js';
import userAuthMiddleware from '../middlewares/userAuthMiddleware.js';

const router = express.Router();

// Public route - anyone can submit contact form
router.post('/submit', submitContactForm);

// Admin only - get all contact messages
router.get('/messages', userAuthMiddleware, async (req, res, next) => {
  // Check if admin
  if (req.userData._id !== "ADMIN_SUPER_USER") {
    return res.status(403).json({ 
      success: false, 
      message: "Admin access required" 
    });
  }
  next();
}, getAllContactMessages);

export default router;