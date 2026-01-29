/* eslint-disable no-unused-vars */
import {
  Briefcase,
  ChevronDown,
  LoaderCircle,
  LogOut,
  Menu,
  Sparkles,
  User,
  X,
  Shield,
  LayoutDashboard,
  Users,
  FileText,
} from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { isLogin, userData, userDataLoading, setIsLogin, isAdmin, setIsAdmin } =
    useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "All Jobs", path: "/all-jobs/all" },
    { name: "Industries", path: "/industries" },
    { name: "Capabilities", path: "/capabilitites" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest('[aria-label="Toggle menu"]')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAdmin");
    toast.success("Logged out successfully");
    setIsLogin(false);
    setIsAdmin(false);
    navigate("/candidate-login");
  };

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`relative transition-all duration-500 ${
          scrolled
            ? "bg-white backdrop-blur-xl shadow-xl shadow-black/5 border-b border-gray-200/70"
            : "bg-transparent"
        }`}
      >
        {/* Admin Banner */}
        {isAdmin && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-1.5 text-xs font-medium">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-3.5 w-3.5" />
              <span>Administrator Mode - Full Access Enabled</span>
            </div>
          </div>
        )}

        <nav className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 transition-transform duration-400 hover:scale-[1.04] active:scale-100"
            >
              <img
                className="w-[152px] h-auto drop-shadow-sm transition-all duration-400 group-hover:drop-shadow-md group-hover:brightness-110"
                src={assets.logo}
                alt="Lecruiter"
              />
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-2">
              {menu.map((item, i) => (
                <li key={item.path} className="relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-gray-900 bg-white/70 shadow-sm"
                          : "text-gray-700 hover:text-gray-900 hover:bg-white/40"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{item.name}</span>
                        {isActive && (
                          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-100/60 to-transparent -z-0" />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth / Profile */}
            <div className="hidden lg:flex items-center gap-4">
              {userDataLoading ? (
                <LoaderCircle className="w-7 h-7 animate-spin text-gray-600" />
              ) : isLogin ? (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen((p) => !p)}
                    className={`group flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border shadow-sm hover:shadow transition-all duration-300 ${
                      isAdmin
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 hover:border-blue-400"
                        : "bg-white/60 hover:bg-white/90 border-gray-200/80 hover:border-gray-300"
                    }`}
                    aria-expanded={isProfileMenuOpen}
                  >
                    <div className="relative">
                      <img
                        className={`w-10 h-10 rounded-full object-cover ring-2 transition-all duration-300 ${
                          isAdmin
                            ? "ring-blue-400 group-hover:ring-blue-500"
                            : "ring-gray-200/80 group-hover:ring-gray-300"
                        }`}
                        src={userData?.image || assets.avatarPlaceholder}
                        alt="Profile"
                        onError={(e) => (e.currentTarget.src = assets.avatarPlaceholder)}
                      />
                      {isAdmin ? (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                          <Shield className="h-2 w-2 text-white" />
                        </div>
                      ) : (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                      )}
                    </div>
                    <span className={`font-medium text-sm tracking-tight ${isAdmin ? "text-blue-900" : "text-gray-800"}`}>
                      {userData?.name?.split(" ")[0] || "Account"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-300 ${isProfileMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 w-72 origin-top-right animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/70 overflow-hidden divide-y divide-gray-100">
                        {/* User Info */}
                        <div className={`px-5 py-5 ${isAdmin ? "bg-gradient-to-br from-blue-50 to-purple-50" : "bg-gradient-to-br from-gray-50 to-white"}`}>
                          <div className="flex items-center gap-4">
                            <div className="relative shrink-0">
                              <img
                                className={`w-14 h-14 rounded-full object-cover ring-4 shadow-md ${
                                  isAdmin ? "ring-blue-100" : "ring-white"
                                }`}
                                src={userData?.image || assets.avatarPlaceholder}
                                alt="Profile"
                                onError={(e) => (e.currentTarget.src = assets.avatarPlaceholder)}
                              />
                              {isAdmin && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full border-3 border-white shadow flex items-center justify-center">
                                  <Shield className="h-3.5 w-3.5 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-900 truncate">
                                  {userData?.name || "User"}
                                </p>
                                {isAdmin && (
                                  <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 truncate">{userData?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {/* Admin-Only Menu Items */}
                          {isAdmin && (
                            <>
                              <Link
                                to="/dashboard"
                                className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-blue-700 hover:bg-blue-50/80 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <LayoutDashboard size={18} className="text-blue-500 group-hover:text-blue-700 transition-colors" />
                                <span>Admin Dashboard</span>
                              </Link>

                              <Link
                                to="/admin/users"
                                className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <Users size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                                <span>Manage Users</span>
                              </Link>

                              <Link
                                to="/admin/reports"
                                className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <FileText size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                                <span>Reports</span>
                              </Link>

                              <div className="border-t border-gray-100 my-2"></div>
                            </>
                          )}

                          {/* Regular User Menu Items */}
                          {!isAdmin && (
                            <>
                              <Link
                                to="/profile"
                                className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <User size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                                <span>Profile</span>
                              </Link>

                              <Link
                                to="/applications"
                                className="group flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50/80 transition-colors"
                                onClick={() => setIsProfileMenuOpen(false)}
                              >
                                <Briefcase size={18} className="text-gray-400 group-hover:text-gray-700 transition-colors" />
                                <span>Applied Jobs</span>
                              </Link>
                            </>
                          )}

                          <button
                            onClick={handleLogout}
                            className="group w-full flex items-center gap-3 px-5 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50/80 transition-colors"
                          >
                            <LogOut size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/recruiter-login"
                    className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-white/70 hover:bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow transition-all duration-300"
                  >
                    Recruiter
                  </Link>

                  <Link
                    to="/candidate-login"
                    className="relative px-7 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-gray-900 via-black to-gray-800 hover:from-black hover:via-gray-900 hover:to-black shadow-lg shadow-gray-900/25 hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span>Login</span>
                    <Sparkles size={15} className="group-hover:animate-pulse" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
              className="lg:hidden p-2.5 rounded-full text-gray-700 hover:bg-white/60 hover:text-gray-900 transition-all duration-300 border border-transparent hover:border-gray-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay + Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-400 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          ref={mobileMenuRef}
          className={`absolute top-0 bottom-0 left-0 w-4/5 max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl transform transition-transform duration-400 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img className="h-9" src={assets.logo} alt="Lecruiter" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="p-6 pb-8 space-y-6">
              {/* Navigation Menu */}
              <ul className="space-y-2">
                {menu.map((item, i) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-5 py-4 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* User Section */}
              {userDataLoading ? (
                <div className="flex justify-center py-10">
                  <LoaderCircle className="w-8 h-8 animate-spin text-gray-600" />
                </div>
              ) : isLogin ? (
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  {/* User Info Card */}
                  <div className={`flex items-center gap-4 px-4 py-4 rounded-xl ${
                    isAdmin ? "bg-gradient-to-br from-blue-50 to-purple-50" : "bg-gray-50/70"
                  }`}>
                    <div className="relative shrink-0">
                      <img
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200"
                        src={userData?.image || assets.avatarPlaceholder}
                        alt="Profile"
                        onError={(e) => (e.currentTarget.src = assets.avatarPlaceholder)}
                      />
                      {isAdmin && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow flex items-center justify-center">
                          <Shield className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-gray-900 truncate">{userData?.name}</p>
                        {isAdmin && (
                          <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded shrink-0">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{userData?.email}</p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="space-y-2">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
                        >
                          <LayoutDashboard size={20} className="shrink-0" />
                          <span>Admin Dashboard</span>
                        </Link>

                        <Link
                          to="/admin/users"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <Users size={20} className="shrink-0" />
                          <span>Manage Users</span>
                        </Link>

                        <Link
                          to="/admin/reports"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <FileText size={20} className="shrink-0" />
                          <span>Reports</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <User size={20} className="shrink-0" />
                          <span>Profile</span>
                        </Link>

                        <Link
                          to="/applications"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-5 py-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                        >
                          <Briefcase size={20} className="shrink-0" />
                          <span>Applied Jobs</span>
                        </Link>
                      </>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      <LogOut size={20} className="shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <Link
                    to="/recruiter-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-center py-4 rounded-xl font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                  >
                    Recruiter Login
                  </Link>

                  <Link
                    to="/candidate-login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 text-center py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 shadow-lg transition-all"
                  >
                    <span>Candidate Login</span>
                    <Sparkles size={16} className="animate-pulse" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;