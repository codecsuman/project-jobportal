import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diff = now - createdAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="p-6 rounded-2xl shadow-xl bg-white/80 border border-gray-200 
                 backdrop-blur-lg hover:shadow-2xl cursor-pointer"
    >
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>

        <Button
          variant="outline"
          className="rounded-full shadow-sm hover:bg-gray-100"
          size="icon"
        >
          <Bookmark className="text-gray-600" size={18} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 my-4">
        <div className="p-1 rounded-full border shadow-sm">
          <Avatar className="h-14 w-14">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </div>

        <div>
          <h1 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h1 className="font-bold text-xl text-gray-800 my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-semibold bg-blue-100"
          variant="secondary"
        >
          {job?.position} Positions
        </Badge>

        <Badge
          className="text-purple-700 font-semibold bg-purple-100"
          variant="secondary"
        >
          {job?.jobType}
        </Badge>

        <Badge
          className="text-red-600 font-semibold bg-red-100"
          variant="secondary"
        >
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full hover:bg-gray-100"
        >
          Details
        </Button>

        <Button
          className="bg-gradient-to-r from-purple-600 to-purple-800 w-full 
                     hover:opacity-90 text-white"
        >
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
