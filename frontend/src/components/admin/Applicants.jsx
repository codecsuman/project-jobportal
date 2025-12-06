import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { motion } from "framer-motion";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log("Failed to load applicants:", error);
      }
    };

    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 mt-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Applicants{" "}
          <span className="text-purple-700">
            {applicants?.applications?.length || 0}
          </span>
        </h1>

        <div className="h-[3px] w-40 rounded-full bg-gradient-to-r from-purple-600 to-transparent mb-6"></div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 
                     rounded-2xl p-6"
        >
          <ApplicantsTable />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Applicants;
