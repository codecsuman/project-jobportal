import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-gray-900"
      >
        <span className="text-[#6A38C2]">Latest & Top </span>
        Job Openings
      </motion.h1>

      {/* Decorative underline */}
      <div className="h-[3px] w-40 bg-gradient-to-r from-purple-500 to-transparent my-3 rounded-full"></div>

      {/* Job Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
      >
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center py-16">
            <h2 className="text-xl font-semibold text-gray-600">
              No Jobs Available ❌
            </h2>
            <p className="text-gray-500">
              We're working to bring you more job opportunities soon.
            </p>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
