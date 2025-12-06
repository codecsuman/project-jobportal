import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // ✅ SAFE VERSION
  const selectChangeHandler = (value) => {
    setInput({ ...input, companyId: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Prevent submit without company
    if (!input.companyId) {
      toast.error("Please select a company first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center w-full mt-8 px-4"
      >
        <form
          onSubmit={submitHandler}
          className="p-10 max-w-4xl w-full bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <div className="h-[3px] w-40 bg-gradient-to-r from-purple-600 to-transparent rounded-full mb-6"></div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Job Title</Label>
              <Input name="title" value={input.title} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Requirements</Label>
              <Input name="requirements" value={input.requirements} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Salary</Label>
              <Input name="salary" value={input.salary} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Job Type</Label>
              <Input name="jobType" value={input.jobType} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Experience</Label>
              <Input name="experience" value={input.experience} onChange={changeEventHandler} />
            </div>

            <div>
              <Label>Positions</Label>
              <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
            </div>

            <div className="col-span-2">
              <Label>Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-red-600 mt-2 font-medium">
                  * Please register a company first.
                </p>
              )}
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-6">
              <Loader2 className="mr-2 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6">
              Post New Job
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
