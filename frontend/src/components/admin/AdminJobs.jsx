import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      {/* Navbar */}
      <Navbar />

      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto px-4 my-10"
      >
        {/* Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 my-6">
          {/* Search Field */}
          <Input
            className="w-full sm:w-[250px] bg-white/80 backdrop-blur-lg 
                       border-gray-300 rounded-xl shadow-sm"
            placeholder="Filter by name, role…"
            onChange={(e) => setInput(e.target.value)}
          />

          {/* New Job Button */}
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="px-6 py-2 rounded-xl text-white font-semibold 
                       bg-gradient-to-r from-purple-600 to-purple-800 
                       hover:opacity-90 shadow-md"
          >
            + New Job
          </Button>
        </div>

        {/* Table Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl 
                     border border-gray-200 p-6"
        >
          <AdminJobsTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
