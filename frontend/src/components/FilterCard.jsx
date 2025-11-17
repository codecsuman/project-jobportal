import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/70 backdrop-blur-md border border-gray-200 
                 shadow-lg p-5 rounded-2xl"
    >
      {/* Header */}
      <h1 className="font-bold text-xl text-gray-800">Filter Jobs</h1>
      <div className="mt-2 mb-4 h-[2px] w-full bg-gradient-to-r from-purple-400 to-transparent" />

      {/* Radio Group */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            {/* Section Title */}
            <h2 className="font-semibold text-lg text-gray-700 mb-2">
              {data.filterType}
            </h2>

            {/* Options */}
            {data.array.map((item, idx) => {
              const itemId = `id-${index}-${idx}`;
              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-3 my-2 hover:bg-gray-100 
                             px-2 py-1 rounded-lg transition"
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="border-purple-500 text-purple-600"
                  />
                  <Label
                    htmlFor={itemId}
                    className="cursor-pointer text-gray-700 hover:text-purple-600 transition"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
