import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // ✅ FIX: Dynamic resume check
  const isResume = user?.profile?.resume;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-16">
      <Navbar />

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg border border-gray-200 
                   rounded-3xl mt-8 p-10 shadow-xl"
      >
        {/* Top Section */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24 ring-4 ring-purple-300 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="font-bold text-2xl text-gray-900">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio || "No bio added"}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="hover:bg-gray-100"
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact size={18} />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Skills</h2>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills?.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 font-medium"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-6">
          <Label className="text-md font-bold text-gray-800">Resume</Label>

          {isResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-600 hover:underline block mt-2"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md shadow-xl 
                   border border-gray-200 rounded-3xl p-8 mt-10"
      >
        <h2 className="font-bold text-xl text-gray-800 mb-4">Applied Jobs</h2>
        <AppliedJobTable />
      </motion.div>

      {/* Update Profile Modal */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
