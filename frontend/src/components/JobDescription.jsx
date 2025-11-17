import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };

        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto my-12 p-8 bg-white/70 backdrop-blur-xl 
                 rounded-3xl shadow-xl border border-gray-200"
    >
      {/* TOP SECTION */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {singleJob?.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <Badge className="bg-blue-100 text-blue-700 font-semibold">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-semibold">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-red-100 text-red-600 font-semibold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-2 rounded-xl text-white text-base shadow-md transition 
            ${isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90"
            }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Divider */}
      <div className="mt-6 h-[2px] bg-gradient-to-r from-purple-500/60 to-transparent" />

      {/* DETAILS SECTION */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-[15px]">
        <Detail label="Role" value={singleJob?.title} />
        <Detail label="Location" value={singleJob?.location} />
        <Detail label="Experience" value={`${singleJob?.experience} yrs`} />
        <Detail label="Salary" value={`${singleJob?.salary} LPA`} />
        <Detail
          label="Total Applicants"
          value={`${singleJob?.applications?.length}`}
        />
        <Detail
          label="Posted On"
          value={singleJob?.createdAt.split("T")[0]}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-gray-900">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {singleJob?.description}
        </p>
      </div>
    </motion.div>
  );
};

/* Reusable Component */
const Detail = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-900">{label}:</p>
    <p className="pl-2 text-gray-700">{value}</p>
  </div>
);

export default JobDescription;
