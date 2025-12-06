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

  // ✅ FIXED DEPENDENCY ARRAY
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

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

          <div className="mb-4">
            <Label>Full Name</Label>
            <Input name="fullname" value={input.fullname} onChange={changeEventHandler} />
          </div>

          <div className="mb-4">
            <Label>Email</Label>
            <Input name="email" value={input.email} onChange={changeEventHandler} />
          </div>

          <div className="mb-4">
            <Label>Phone Number</Label>
            <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} />
          </div>

          <div className="mb-4">
            <Label>Password</Label>
            <Input type="password" name="password" value={input.password} onChange={changeEventHandler} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Select Role</Label>
              <RadioGroup className="flex gap-5 mt-2">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} />
                <Label>Student</Label>

                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                <Label>Recruiter</Label>
              </RadioGroup>
            </div>

            <div>
              <Label>Profile Picture</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-6" disabled>
              <Loader2 className="animate-spin mr-2" /> Please wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-6">
              Create Account
            </Button>
          )}

          <p className="text-center mt-4 text-sm">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
