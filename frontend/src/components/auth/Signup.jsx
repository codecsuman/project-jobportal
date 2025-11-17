import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2, Upload } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />

      <div className="flex items-center justify-center px-4 sm:px-0 mt-10">
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={submitHandler}
          className="w-full max-w-xl bg-white/60 backdrop-blur-xl border border-white/40 
                     shadow-2xl rounded-2xl p-8"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Your Account 🚀
          </h1>

          {/* Full name */}
          <div className="mb-4">
            <Label className="text-gray-700">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="John Doe"
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label className="text-gray-700">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="mt-1"
            />
          </div>

          {/* Phone number */}
          <div className="mb-4">
            <Label className="text-gray-700">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="0000000000"
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label className="text-gray-700">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1"
            />
          </div>

          {/* Role + File Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

            {/* Role selection */}
            <div>
              <Label className="text-gray-700">Select Role</Label>
              <RadioGroup className="flex gap-5 mt-2">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label>Student</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label>Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* File upload */}
            <div>
              <Label className="text-gray-700">Profile Picture</Label>
              <div className="border border-gray-300 rounded-md p-2 flex items-center gap-3 bg-white mt-1">
                <Upload className="w-5 h-5 text-gray-500" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer border-none p-0"
                />
              </div>
            </div>
          </div>

          {/* Submit button */}
          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6 text-base">
              Create Account
            </Button>
          )}

          {/* Already have account */}
          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
