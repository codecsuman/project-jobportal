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
import { Loader2, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle text input
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value.trim() });
  };

  // Handle file upload
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  // Handle submit
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    // ✅ Validation
    if (!input.fullname || !input.email || !input.password || !input.role) {
      toast.error("Please fill all required fields");
      return;
    }

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
        toast.success(res.data.message || "Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || error.message || "Signup failed"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-6 my-10 shadow-sm"
        >
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          {/* Full Name */}
          <div className="my-3">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="my-3">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="my-3">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="my-3 relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </div>
          </div>

          {/* Role and Profile Upload */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-5 gap-4">
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
              {input.file && (
                <p className="text-xs text-gray-600 truncate max-w-[100px]">
                  {input.file.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button disabled className="w-full my-5">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-5">
              Sign Up
            </Button>
          )}

          {/* Redirect to Login */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
