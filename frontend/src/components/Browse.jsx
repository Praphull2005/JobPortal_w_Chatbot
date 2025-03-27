/* eslint-disable react/jsx-key */
import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { Navbar } from "./shared/Navbar"
import UseGetAllJobs from "@/hooks/UseGetAllJobs";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";

// const randomJobs = [1, 2, 3];
function Browse() {
  UseGetAllJobs();
  const dispatch = useDispatch();
  const allJobs = useSelector(store => store.job.allJobs);

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-lg font-bold my-10">Search Result ({allJobs.length})</h1>
        <div className="grid grid-cols-3 gap-5 my-10">
          {
            allJobs.map((job) => (
                <Job key={job._id} job={job}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Browse