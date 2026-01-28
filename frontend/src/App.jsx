/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import About from "./pages/About";
import AllJobs from "./pages/AllJobs";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import CandidatesLogin from "./pages/CandidatesLogin";
import CandidatesSignup from "./pages/CandidatesSignup";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import RecruiterLogin from "./pages/RecruiterLogin";
import RecruiterSignup from "./pages/RecruiterSignup";
import Dashborad from "./pages/Dashborad";
import AddJobs from "./pages/AddJobs";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import { AppContext } from "./context/AppContext";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Capabilitites from "./pages/Capabilitites";

const App = () => {
  const { companyToken } = useContext(AppContext);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-jobs/:category" element={<AllJobs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/capabilitites" element={<Capabilitites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/candidate-login" element={<CandidatesLogin />} />
        <Route path="/candidate-signup" element={<CandidatesSignup />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/recruiter-signup" element={<RecruiterSignup />} />
        <Route path="/dashboard" element={<Dashborad />}>
          <Route path="add-job" element={<AddJobs />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="view-applications" element={<ViewApplications />} />
        </Route>
      </Routes>
    </AppLayout>
  );
};

export default App;
