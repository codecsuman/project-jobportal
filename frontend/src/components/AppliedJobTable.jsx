import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const getStatusColor = (status) => {
    switch (status) {
      case "rejected":
        return "bg-red-500/15 text-red-600 border border-red-300";
      case "pending":
        return "bg-yellow-500/15 text-yellow-600 border border-yellow-300";
      case "accepted":
        return "bg-green-500/15 text-green-600 border border-green-300";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl shadow-lg bg-white/70 backdrop-blur-lg p-6"
    >
      <Table>
        <TableCaption className="text-lg font-medium text-gray-700 pt-4">
          Your Applied Jobs Overview
        </TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-100/80">
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Job Role</TableHead>
            <TableHead className="font-semibold text-gray-700">Company</TableHead>
            <TableHead className="text-right font-semibold text-gray-700">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell
                colSpan="4"
                className="text-center py-6 text-gray-500 italic"
              >
                You haven't applied to any jobs yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <motion.tr
                key={appliedJob._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-purple-50 transition-all cursor-pointer rounded-lg"
              >
                <TableCell className="py-3">
                  {appliedJob?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="capitalize font-medium">
                  {appliedJob.job?.title}
                </TableCell>

                <TableCell className="capitalize text-gray-700">
                  {appliedJob.job?.company?.name}
                </TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`${getStatusColor(
                      appliedJob.status
                    )} px-3 py-1 text-xs font-semibold rounded-full`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AppliedJobTable;
