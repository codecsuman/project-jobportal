import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white pt-16 pb-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 max-w-3xl mx-auto px-4"
      >
        {/* Tagline */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 py-2 rounded-full bg-white shadow-md text-[#F83002] 
                     font-medium inline-block backdrop-blur-md border"
        >
          🚀 No. 1 Job Hunt Website
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-extrabold leading-tight text-gray-900"
        >
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </motion.h1>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-xl mx-auto"
        >
          Explore thousands of job opportunities with all the information you
          need. Your future starts here!
        </motion.p>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex w-full sm:w-[70%] lg:w-[55%] shadow-xl border border-gray-200 
                     rounded-full items-center gap-4 mx-auto p-2 bg-white"
        >
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full px-4 text-gray-700"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] px-4 py-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
