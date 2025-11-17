import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { motion } from "framer-motion";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <Navbar />

      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto px-5 mt-10"
      >
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Your Company Name
          </h1>
          <div className="h-[3px] w-40 rounded-full bg-gradient-to-r from-purple-600 to-transparent mt-2 mb-4"></div>
          <p className="text-gray-600 text-md">
            What would you like to name your company?
            You can always change this later.
          </p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl border shadow-xl border-gray-200 rounded-2xl p-8"
        >
          <Label className="font-semibold text-gray-700">Company Name</Label>

          <Input
            type="text"
            placeholder="JobHunt, Microsoft, Google…"
            onChange={(e) => setCompanyName(e.target.value)}
            className="my-3 py-6 rounded-xl shadow-sm border-gray-300 
                       focus:border-purple-500 focus:ring-purple-300 
                       transition-all duration-300"
          />

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-10">
            <Button
              variant="outline"
              onClick={() => navigate("/admin/companies")}
              className="px-6 py-2 rounded-xl border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              onClick={registerNewCompany}
              className="px-6 py-2 rounded-xl text-white font-semibold 
                         bg-gradient-to-r from-purple-600 to-purple-800 
                         hover:opacity-90 shadow-md"
            >
              Continue
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;
