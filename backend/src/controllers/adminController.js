// controllers/adminController.js

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await JobApplication.countDocuments();
    const totalCompanies = await Company.countDocuments();

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
        totalApplications,
        totalCompanies
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};