/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import moment from "moment";
import kConverter from "k-convert";
import { assets } from "../assets/assets";
import { MapPin, DollarSign, ArrowRight, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Determine if job is new (posted within last 3 days)
  const isNew = moment().diff(moment(job.date), 'days') <= 3;

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .job-card-clean {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          }

          /* Smooth line clamping */
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Touch optimization for mobile */
          @media (hover: none) {
            .job-card-clean:active {
              transform: scale(0.98);
            }
          }
        `}
      </style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        onClick={() => {
          navigate(`/apply-job/${job._id}`);
          scrollTo(0, 0);
        }}
        className="job-card-clean relative bg-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 cursor-pointer p-4 sm:p-5 md:p-6"
      >
        {/* Bookmark Button - Larger touch target on mobile */}
        <button
          onClick={handleSaveClick}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-8 sm:h-8 rounded-lg hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          aria-label={isSaved ? "Remove bookmark" : "Bookmark job"}
        >
          <Bookmark 
            size={18} 
            className={`transition-colors ${isSaved ? 'fill-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
          />
        </button>

        {/* Company Logo & Job Title */}
        <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 pr-8 sm:pr-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-white border border-gray-200 flex items-center justify-center p-1.5 sm:p-2 shrink-0">
            <img
              className="w-full h-full object-contain"
              src={job.companyId?.image || assets.company_icon}
              alt={job.companyId?.name || "Company"}
            />
          </div>

          <div className="flex-1 min-w-0 pt-0.5 sm:pt-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2 leading-tight line-clamp-2">
              {job.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
              {job.companyId?.name || "Unknown Company"}
            </p>
          </div>
        </div>

        {/* Job Level & Time - Responsive wrapping */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
          <span className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-md sm:rounded-lg">
            {job.level}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 font-medium">
            {moment(job.date).fromNow()}
          </span>
          {isNew && (
            <span className="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md sm:rounded-lg">
              NEW
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700 mb-2.5 sm:mb-3">
          <MapPin size={16} className="text-gray-400 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">{job.location}</span>
        </div>

        {/* Salary */}
        <div className="flex items-center gap-2 text-gray-900 mb-5 sm:mb-6">
          <DollarSign size={16} className="text-gray-400 sm:w-[18px] sm:h-[18px] flex-shrink-0" />
          <span className="text-sm sm:text-base font-bold">
            {job.salary ? kConverter.convertTo(job.salary) : "$120k - $150k"}
          </span>
        </div>

        {/* View Details Button - More prominent on mobile */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            View Details
          </span>
          <div className="w-8 h-8 rounded-lg bg-gray-900 hover:bg-gray-800 active:bg-gray-700 flex items-center justify-center transition-colors duration-200">
            <ArrowRight size={16} className="text-white" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default JobCard;