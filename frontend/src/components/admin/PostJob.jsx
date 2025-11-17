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

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

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
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <Navbar />

      {/* Wrapper */}
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
          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post a New Job
          </h1>
          <div className="h-[3px] w-40 bg-gradient-to-r from-purple-600 to-transparent rounded-full mb-6"></div>

          {/* GRID FORM */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="font-medium">Job Title</Label>
              <Input
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Software Engineer"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Job description"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Requirements</Label>
              <Input
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="React, Node.js, MongoDB"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Salary (LPA)</Label>
              <Input
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="4 - 12 LPA"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Delhi, Bangalore..."
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Job Type</Label>
              <Input
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Full-time / Remote"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">Experience (Years)</Label>
              <Input
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="0 - 5"
                className="rounded-xl py-6 mt-1"
              />
            </div>

            <div>
              <Label className="font-medium">No. of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="rounded-xl py-6 mt-1"
              />
            </div>

            {/* Select Company */}
            <div className="col-span-2">
              <Label className="font-medium">Select Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full rounded-xl mt-1 py-6">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company, idx) => (
                        <SelectItem
                          key={idx}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 mt-2 font-medium">
                  * Please register a company first.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-6 rounded-xl py-6">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-6 rounded-xl py-6 text-white 
                         font-semibold bg-gradient-to-r 
                         from-purple-600 to-purple-800 hover:opacity-90"
            >
              Post New Job
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default PostJob;
