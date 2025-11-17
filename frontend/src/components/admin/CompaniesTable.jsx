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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Table className="rounded-xl overflow-hidden">
        <TableCaption className="text-gray-600 font-medium mt-4">
          Recently Registered Companies
        </TableCaption>

        {/* HEADER */}
        <TableHeader>
          <TableRow className="bg-gray-100/60">
            <TableHead className="font-semibold text-gray-800">Logo</TableHead>
            <TableHead className="font-semibold text-gray-800">Name</TableHead>
            <TableHead className="font-semibold text-gray-800">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-800">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {filterCompany?.map((company, index) => (
            <motion.tr
              key={company._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="hover:bg-gray-50 transition cursor-pointer"
            >
              {/* Logo */}
              <TableCell>
                <Avatar className="shadow-sm ring-1 ring-gray-200">
                  <AvatarImage src={company.logo} alt={company.name} />
                </Avatar>
              </TableCell>

              {/* Name */}
              <TableCell className="font-medium text-gray-900">
                {company.name}
              </TableCell>

              {/* Date */}
              <TableCell className="text-gray-600">
                {company.createdAt?.split("T")[0]}
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="hover:text-gray-700" />
                  </PopoverTrigger>

                  <PopoverContent className="w-36 bg-white shadow-lg rounded-lg">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 cursor-pointer"
                    >
                      <Edit2 size={16} />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </motion.tr>
          ))}

          {filterCompany?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No Company Found ❌
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default CompaniesTable;
