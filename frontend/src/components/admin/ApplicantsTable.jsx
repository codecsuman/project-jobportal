import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );

      if (res.data.success) {
        toast.success(`Applicant ${status} Successfully`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Table className="rounded-xl overflow-hidden">
        <TableCaption className="text-gray-600 font-medium mt-4">
          List of users who applied to this job
        </TableCaption>

        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-gray-100/60">
            <TableHead className="font-semibold text-gray-800">
              Full Name
            </TableHead>
            <TableHead className="font-semibold text-gray-800">
              Email
            </TableHead>
            <TableHead className="font-semibold text-gray-800">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-gray-800">
              Resume
            </TableHead>
            <TableHead className="font-semibold text-gray-800">
              Applied On
            </TableHead>
            <TableHead className="text-right font-semibold text-gray-800">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {applicants?.applications?.map((item, i) => (
            <motion.tr
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="hover:bg-gray-50 transition cursor-pointer"
            >
              <TableCell className="font-medium text-gray-900">
                {item?.applicant?.fullname}
              </TableCell>

              <TableCell className="text-gray-700">
                {item?.applicant?.email}
              </TableCell>

              <TableCell className="text-gray-700">
                {item?.applicant?.phoneNumber}
              </TableCell>

              <TableCell>
                {item.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 font-medium underline hover:text-purple-800"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </TableCell>

              <TableCell className="text-gray-600">
                {item?.applicant?.createdAt?.split("T")[0]}
              </TableCell>

              {/* ACTION DROPDOWN */}
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="hover:text-gray-700" />
                  </PopoverTrigger>

                  <PopoverContent className="w-36 bg-white shadow-lg rounded-lg">
                    {shortlistingStatus.map((status, idx) => (
                      <div
                        key={idx}
                        onClick={() => statusHandler(status, item?._id)}
                        className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 cursor-pointer"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </motion.tr>
          ))}

          {/* Empty State */}
          {(!applicants || applicants?.applications?.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-gray-500 py-8"
              >
                No Applicants Found ❌
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ApplicantsTable;
