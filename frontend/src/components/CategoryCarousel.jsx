import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12"
    >
      <Carousel className="w-full max-w-3xl mx-auto">
        <CarouselContent className="flex items-center">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center py-3"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => searchJobHandler(cat)}
                  className="rounded-full px-6 py-3 text-sm font-medium 
                             bg-gradient-to-r from-[#6A38C2] to-[#9d6bff] 
                             hover:opacity-90 shadow-md text-white"
                >
                  {cat}
                </Button>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hover:bg-gray-200/70 shadow-md backdrop-blur-sm" />
        <CarouselNext className="hover:bg-gray-200/70 shadow-md backdrop-blur-sm" />
      </Carousel>
    </motion.div>
  );
};

export default CategoryCarousel;
