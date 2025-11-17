import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      const text = searchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(text) ||
        job?.company?.name?.toLowerCase().includes(text)
      );
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Table className="rounded-xl overflow-hidden">
        <TableCaption className="text-gray-600 font-medium mt-4">
          Recently Posted Jobs
        </TableCaption>

        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-gray-100/70">
            <TableHead className="font-semibold text-gray-800">
              Company Name
            </TableHead>
            <TableHead className="font-semibold text-gray-800">Role</TableHead>
            <TableHead className="font-semibold text-gray-800">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-800">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job, index) => (
              <motion.tr
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <TableCell className="font-medium text-gray-800">
                  {job?.company?.name}
                </TableCell>
                <TableCell className="text-gray-700">
                  {job?.title}
                </TableCell>
                <TableCell className="text-gray-500">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>

                {/* ACTION MENU */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent className="w-36">
                      {/* Edit */}
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${job._id}`)
                        }
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <Edit2 size={16} className="text-gray-700" />
                        <span>Edit</span>
                      </div>

                      {/* Applicants */}
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        <Eye size={16} className="text-gray-700" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-gray-500 py-6 font-medium"
              >
                No Jobs Found ❌
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AdminJobsTable;
