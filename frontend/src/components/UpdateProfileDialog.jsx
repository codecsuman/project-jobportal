import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[450px] rounded-2xl shadow-2xl bg-white/80 backdrop-blur-xl border border-gray-200"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-5 py-4"
          >
            {/* Full Name */}
            <FormRow
              id="fullname"
              label="Full Name"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
            />

            {/* Email */}
            <FormRow
              id="email"
              label="Email"
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
            />

            {/* Phone Number */}
            <FormRow
              id="phoneNumber"
              label="Phone Number"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
            />

            {/* Bio */}
            <FormRow
              id="bio"
              label="Bio"
              value={input.bio}
              name="bio"
              onChange={changeEventHandler}
            />

            {/* Skills */}
            <FormRow
              id="skills"
              label="Skills (comma separated)"
              value={input.skills}
              name="skills"
              onChange={changeEventHandler}
            />

            {/* Resume */}
            <FormRow
              id="file"
              label="Resume"
              type="file"
              accept="application/pdf"
              onChange={fileChangeHandler}
            />
          </motion.div>

          {/* Footer */}
          <DialogFooter>
            {loading ? (
              <Button className="w-full py-6">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:opacity-90"
              >
                Update Profile
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* Reusable form row component */
const FormRow = ({ id, label, type = "text", ...props }) => (
  <div className="grid grid-cols-4 items-center gap-4">
    <Label htmlFor={id} className="text-right font-medium text-gray-700">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      className="col-span-3 bg-white/70 border-gray-300 rounded-lg shadow-sm"
      {...props}
    />
  </div>
);

export default UpdateProfileDialog;
