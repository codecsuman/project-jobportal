import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });

        if (isMounted && res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("❌ Failed to fetch admin jobs:", error);
      }
    };

    fetchAllAdminJobs();

    return () => {
      isMounted = false; // cleanup
    };
  }, [dispatch]);
};

export default useGetAllAdminJobs;
