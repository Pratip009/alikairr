import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaCalendar,
  FaGlobe,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaGraduationCap,
  FaCertificate,
  FaLanguage,
  FaAward,
  FaPlus,
  FaTrash,
  FaFileDownload,
} from "react-icons/fa";

const Profile = () => {
  const { isLogin, userData, userDataLoading, backendUrl, userToken, fetchUserData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (userData) {
      setEditedData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
        bio: userData.bio || "",
        jobTitle: userData.jobTitle || "",
        company: userData.company || "",
        website: userData.website || "",
        linkedin: userData.linkedin || "",
        twitter: userData.twitter || "",
        github: userData.github || "",
        skills: userData.skills || [],
        experience: userData.experience || [],
        education: userData.education || [],
        certifications: userData.certifications || [],
        languages: userData.languages || [],
        resumeUrl: userData.resumeUrl || "",
      });
    }
  }, [userData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditedData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        location: userData.location || "",
        bio: userData.bio || "",
        jobTitle: userData.jobTitle || "",
        company: userData.company || "",
        website: userData.website || "",
        linkedin: userData.linkedin || "",
        twitter: userData.twitter || "",
        github: userData.github || "",
        skills: userData.skills || [],
        experience: userData.experience || [],
        education: userData.education || [],
        certifications: userData.certifications || [],
        languages: userData.languages || [],
        resumeUrl: userData.resumeUrl || "",
      });
    }
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSave = async () => {
  try {
    setIsSaving(true);

    const cleanedData = {
      ...editedData,
      skills: editedData.skills.filter(skill => skill.trim() !== ""),
      certifications: editedData.certifications.filter(cert => cert.trim() !== ""),
    };

    const response = await axios.put(
      `${backendUrl}/user/update-profile`,
      cleanedData,
      {
        headers: { 
          token: userToken,
          'Content-Type': 'application/json'  // Add this
        }
      }
    );

    if (response.data.success) {
      toast.success("Profile updated successfully!");
      await fetchUserData();
      setIsEditing(false);
    } else {
      toast.error(response.data.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Profile update error:", error);
    console.error("Error response:", error.response?.data); // Add this for debugging
    toast.error(error.response?.data?.message || "Failed to update profile");
  } finally {
    setIsSaving(false);
  }
};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        toast.info("Uploading image...");

        const response = await axios.put(
          `${backendUrl}/user/update-image`,
          formData,
          {
            headers: {
              token: userToken,
              "Content-Type": "multipart/form-data"
            }
          }
        );

        if (response.data.success) {
          toast.success("Profile image updated successfully!");
          await fetchUserData();
        } else {
          toast.error(response.data.message || "Failed to upload image");
        }
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error(error.response?.data?.message || "Failed to upload image");
      }
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PDF, DOC, and DOCX files are allowed");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("resume", file);

        toast.info("Uploading resume...");

        const response = await axios.post(
          `${backendUrl}/user/upload-resume`,
          formData,
          {
            headers: {
              token: userToken,
              "Content-Type": "multipart/form-data"
            }
          }
        );

        if (response.data.success) {
          toast.success("Resume uploaded successfully!");
          await fetchUserData();
        } else {
          toast.error(response.data.message || "Failed to upload resume");
        }
      } catch (error) {
        console.error("Resume upload error:", error);
        toast.error(error.response?.data?.message || "Failed to upload resume");
      }
    }
  };

  const addSkill = () => {
    setEditedData({
      ...editedData,
      skills: [...(editedData.skills || []), ""],
    });
  };

  const updateSkill = (index, value) => {
    const newSkills = [...editedData.skills];
    newSkills[index] = value;
    setEditedData({ ...editedData, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = editedData.skills.filter((_, i) => i !== index);
    setEditedData({ ...editedData, skills: newSkills });
  };

  const addExperience = () => {
    setEditedData({
      ...editedData,
      experience: [
        ...(editedData.experience || []),
        { title: "", company: "", period: "", description: "" },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...editedData.experience];
    newExperience[index][field] = value;
    setEditedData({ ...editedData, experience: newExperience });
  };

  const removeExperience = (index) => {
    const newExperience = editedData.experience.filter((_, i) => i !== index);
    setEditedData({ ...editedData, experience: newExperience });
  };

  const addEducation = () => {
    setEditedData({
      ...editedData,
      education: [
        ...(editedData.education || []),
        { degree: "", institution: "", year: "" },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...editedData.education];
    newEducation[index][field] = value;
    setEditedData({ ...editedData, education: newEducation });
  };

  const removeEducation = (index) => {
    const newEducation = editedData.education.filter((_, i) => i !== index);
    setEditedData({ ...editedData, education: newEducation });
  };

  const addCertification = () => {
    setEditedData({
      ...editedData,
      certifications: [...(editedData.certifications || []), ""],
    });
  };

  const updateCertification = (index, value) => {
    const newCertifications = [...editedData.certifications];
    newCertifications[index] = value;
    setEditedData({ ...editedData, certifications: newCertifications });
  };

  const removeCertification = (index) => {
    const newCertifications = editedData.certifications.filter(
      (_, i) => i !== index,
    );
    setEditedData({ ...editedData, certifications: newCertifications });
  };

  const addLanguage = () => {
    setEditedData({
      ...editedData,
      languages: [
        ...(editedData.languages || []),
        { name: "", proficiency: "" },
      ],
    });
  };

  const updateLanguage = (index, field, value) => {
    const newLanguages = [...editedData.languages];
    newLanguages[index][field] = value;
    setEditedData({ ...editedData, languages: newLanguages });
  };

  const removeLanguage = (index) => {
    const newLanguages = editedData.languages.filter((_, i) => i !== index);
    setEditedData({ ...editedData, languages: newLanguages });
  };

  if (userDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isLogin || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl mb-6 mx-auto">
            <FaUser />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your profile</p>
          <a href="/login" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center text-white text-5xl font-bold">
                  {userData.image ? (
                    <img src={userData.image} alt={userData.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{userData.name?.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all duration-300">
                    <FaCamera className="text-blue-400" />
                    <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                  </label>
                )}
              </div>

              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button onClick={handleEditToggle} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave /> Save
                        </>
                      )}
                    </button>
                    <button onClick={handleEditToggle} disabled={isSaving} className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      <FaTimes /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              {isEditing ? (
                <div className="space-y-4">
                  <input type="text" name="name" value={editedData.name} onChange={handleChange} className="text-3xl font-bold text-gray-800 border-b-2 border-blue-600 focus:outline-none w-full" placeholder="Your Name" />
                  <input type="text" name="jobTitle" value={editedData.jobTitle} onChange={handleChange} className="text-xl text-gray-600 border-b border-gray-300 focus:outline-none w-full" placeholder="Job Title" />
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{userData.name}</h1>
                  <p className="text-xl text-gray-600">{userData.jobTitle || "Job Seeker"}</p>
                </>
              )}
            </div>

            <div className="mb-6">
              {isEditing ? (
                <textarea name="bio" value={editedData.bio} onChange={handleChange} rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" placeholder="Write a brief bio about yourself..."></textarea>
              ) : (
                <p className="text-gray-700 leading-relaxed">{userData.bio || 'No bio added yet. Click "Edit Profile" to add one.'}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium">{userData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                  <FaPhone />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  {isEditing ? (
                    <input type="tel" name="phone" value={editedData.phone} onChange={handleChange} className="text-sm font-medium border-b border-gray-300 focus:outline-none w-full" placeholder="Add phone" />
                  ) : (
                    <p className="text-sm font-medium">{userData.phone || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  {isEditing ? (
                    <input type="text" name="location" value={editedData.location} onChange={handleChange} className="text-sm font-medium border-b border-gray-300 focus:outline-none w-full" placeholder="Add location" />
                  ) : (
                    <p className="text-sm font-medium">{userData.location || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                  <FaBriefcase />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Company</p>
                  {isEditing ? (
                    <input type="text" name="company" value={editedData.company} onChange={handleChange} className="text-sm font-medium border-b border-gray-300 focus:outline-none w-full" placeholder="Add company" />
                  ) : (
                    <p className="text-sm font-medium">{userData.company || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaAward className="text-blue-600" />
              Skills
            </h2>
            {isEditing && (
              <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                <FaPlus /> Add Skill
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              {editedData.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input type="text" value={skill} onChange={(e) => updateSkill(index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter skill" />
                  <button onClick={() => removeSkill(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {userData.skills?.length > 0 ? (
                userData.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">{skill}</span>
                ))
              ) : (
                <p className="text-gray-500">No skills added yet.</p>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaBriefcase className="text-blue-600" />
              Work Experience
            </h2>
            {isEditing && (
              <button onClick={addExperience} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                <FaPlus /> Add Experience
              </button>
            )}
          </div>

          <div className="space-y-6">
            {isEditing ? (
              editedData.experience?.map((exp, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-xl space-y-3">
                  <div className="flex justify-end">
                    <button onClick={() => removeExperience(index)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-300">
                      <FaTrash />
                    </button>
                  </div>
                  <input type="text" value={exp.title} onChange={(e) => updateExperience(index, "title", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Job Title" />
                  <input type="text" value={exp.company} onChange={(e) => updateExperience(index, "company", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Company Name" />
                  <input type="text" value={exp.period} onChange={(e) => updateExperience(index, "period", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Period (e.g., Jan 2020 - Present)" />
                  <textarea value={exp.description} onChange={(e) => updateExperience(index, "description", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" rows="3" placeholder="Job Description"></textarea>
                </div>
              ))
            ) : userData.experience?.length > 0 ? (
              userData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                  <h3 className="text-xl font-bold text-gray-800">{exp.title}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No work experience added yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <FaGraduationCap className="text-blue-600" />
              Education
            </h2>
            {isEditing && (
              <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300">
                <FaPlus /> Add Education
              </button>
            )}
          </div>

          <div className="space-y-4">
            {isEditing ? (
              editedData.education?.map((edu, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-xl space-y-3">
                  <div className="flex justify-end">
                    <button onClick={() => removeEducation(index)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-300">
                      <FaTrash />
                    </button>
                  </div>
                  <input type="text" value={edu.degree} onChange={(e) => updateEducation(index, "degree", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Degree" />
                  <input type="text" value={edu.institution} onChange={(e) => updateEducation(index, "institution", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Institution Name" />
                  <input type="text" value={edu.year} onChange={(e) => updateEducation(index, "year", e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Year (e.g., 2020)" />
                </div>
              ))
            ) : userData.education?.length > 0 ? (
              userData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                    <FaGraduationCap />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education added yet.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaCertificate className="text-blue-600" />
                Certifications
              </h2>
              {isEditing && (
                <button onClick={addCertification} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm">
                  <FaPlus />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                {editedData.certifications?.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input type="text" value={cert} onChange={(e) => updateCertification(index, e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Certification name" />
                    <button onClick={() => removeCertification(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {userData.certifications?.length > 0 ? (
                  userData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FaCertificate className="text-blue-600" />
                      <span className="text-gray-800">{cert}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No certifications added yet.</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaLanguage className="text-blue-600" />
                Languages
              </h2>
              {isEditing && (
                <button onClick={addLanguage} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 text-sm">
                  <FaPlus />
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-3">
                {editedData.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input type="text" value={lang.name} onChange={(e) => updateLanguage(index, "name", e.target.value)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Language" />
                    <select value={lang.proficiency} onChange={(e) => updateLanguage(index, "proficiency", e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Level</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Basic">Basic</option>
                    </select>
                    <button onClick={() => removeLanguage(index)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300">
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {userData.languages?.length > 0 ? (
                  userData.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FaLanguage className="text-blue-600" />
                        <span className="text-gray-800 font-medium">{lang.name}</span>
                      </div>
                      <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">{lang.proficiency}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No languages added yet.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaFileDownload className="text-blue-600" />
              Resume
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FaFileDownload className="text-4xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload resume</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleResumeUpload} accept=".pdf,.doc,.docx" />
                </label>
              </div>
            ) : (
              <div>
                {userData.resumeUrl || userData.resume ? (
                  <a href={userData.resumeUrl || userData.resume} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300">
                    <FaFileDownload className="text-blue-600 text-2xl" />
                    <div>
                      <p className="font-medium text-gray-800">View Resume</p>
                      <p className="text-sm text-gray-600">Click to download</p>
                    </div>
                  </a>
                ) : (
                  <p className="text-gray-500">No resume uploaded yet.</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <FaGlobe className="text-blue-600" />
              Social Links
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white">
                  <FaLinkedinIn />
                </div>
                {isEditing ? (
                  <input type="text" name="linkedin" value={editedData.linkedin} onChange={handleChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="LinkedIn URL" />
                ) : (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">LinkedIn</p>
                    <p className="text-gray-800 font-medium">{userData.linkedin || "Not added"}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#1DA1F2] flex items-center justify-center text-white">
                  <FaTwitter />
                </div>
                {isEditing ? (
                  <input type="text" name="twitter" value={editedData.twitter} onChange={handleChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Twitter URL" />
                ) : (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Twitter</p>
                    <p className="text-gray-800 font-medium">{userData.twitter || "Not added"}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white">
                  <FaGithub />
                </div>
                {isEditing ? (
                  <input type="text" name="github" value={editedData.github} onChange={handleChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="GitHub URL" />
                ) : (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">GitHub</p>
                    <p className="text-gray-800 font-medium">{userData.github || "Not added"}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white">
                  <FaGlobe />
                </div>
                {isEditing ? (
                  <input type="text" name="website" value={editedData.website} onChange={handleChange} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Website URL" />
                ) : (
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="text-gray-800 font-medium">{userData.website || "Not added"}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;