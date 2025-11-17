import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) formData.append("file", input.file);

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-14">
      <Navbar />

      {/* Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto px-5 mt-10"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 rounded-xl px-4 py-2 border-gray-300 hover:bg-gray-100"
          >
            <ArrowLeft />
            Back
          </Button>

          <h1 className="text-3xl font-bold text-gray-900">Company Setup</h1>
        </div>

        {/* Card */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl border shadow-xl 
                     border-gray-200 rounded-2xl p-8 space-y-6"
        >
          {/* GRID INPUTS */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label className="font-medium">Company Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="rounded-xl py-6 shadow-sm border-gray-300 
                           focus:border-purple-600 focus:ring-purple-200
                           transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="rounded-xl py-6 shadow-sm border-gray-300 
                           focus:border-purple-600 focus:ring-purple-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="rounded-xl py-6 shadow-sm border-gray-300 
                           focus:border-purple-600 focus:ring-purple-200"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="rounded-xl py-6 shadow-sm border-gray-300 
                           focus:border-purple-600 focus:ring-purple-200"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2 col-span-2">
              <Label className="font-medium">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="rounded-xl py-6 border-gray-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Btn */}
          {loading ? (
            <Button className="w-full my-4 rounded-xl py-5">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 rounded-xl py-5 text-white font-semibold 
                         bg-gradient-to-r from-purple-600 to-purple-800 
                         hover:opacity-90 shadow-md"
            >
              Update
            </Button>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
