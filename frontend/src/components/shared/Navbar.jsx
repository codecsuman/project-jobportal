import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-lg bg-white/60 shadow-md sticky top-0 z-50"
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">

        {/* Left Logo */}
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-gray-900">
            Job
            <span className="text-[#6A38C2]">Portal</span>
          </h1>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <NavItem to="/admin/companies" label="Companies" />
                <NavItem to="/admin/jobs" label="Jobs" />
              </>
            ) : (
              <>
                <NavItem to="/" label="Home" />
                <NavItem to="/jobs" label="Jobs" />
                <NavItem to="/browse" label="Browse" />
              </>
            )}
          </ul>

          {/* Right Buttons / User */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-gray-100 transition">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#6A38C2] hover:ring-purple-700 transition">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-80 shadow-xl border rounded-xl">
                <div className="">

                  {/* Profile Header */}
                  <div className="flex gap-3 items-center pb-3 border-b">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {user?.fullname}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {user?.profile?.bio || "No bio added"}
                      </p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="flex flex-col gap-3 mt-3 text-gray-700">
                    {user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition">
                        <User2 size={18} />
                        <Link to="/profile">
                          <Button variant="link" className="px-0">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    )}

                    <div
                      onClick={logoutHandler}
                      className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition"
                    >
                      <LogOut size={18} />
                      <Button variant="link" className="px-0 text-red-600">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

/* ---------------- Reusable Nav Item Component ---------------- */
const NavItem = ({ to, label }) => (
  <li>
    <Link
      to={to}
      className="relative group hover:text-[#6A38C2] transition"
    >
      {label}
      <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-[#6A38C2] group-hover:w-full transition-all duration-300"></span>
    </Link>
  </li>
);

export default Navbar;
