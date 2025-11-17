import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="p-6 rounded-2xl shadow-xl bg-white/80 border border-gray-200
                 backdrop-blur-md hover:shadow-2xl cursor-pointer"
    >
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-lg text-gray-900">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title + Description */}
      <div className="mt-3">
        <h1 className="font-bold text-xl text-gray-900">{job?.title}</h1>
        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-100 text-blue-700 font-semibold" variant="secondary">
          {job?.position} Positions
        </Badge>

        <Badge className="bg-orange-100 text-orange-600 font-semibold" variant="secondary">
          {job?.jobType}
        </Badge>

        <Badge className="bg-purple-100 text-purple-700 font-semibold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
