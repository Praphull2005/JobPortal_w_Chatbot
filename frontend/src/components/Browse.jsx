import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import UseGetAllJobs from "@/hooks/UseGetAllJobs";
import { useEffect } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";

function Browse() {
  UseGetAllJobs();
  const dispatch = useDispatch();
  const allJobs = useSelector(store => store.job.allJobs);

  useEffect(() => {
    dispatch(setSearchedQuery(""));
  },[])
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <h1 className="text-lg sm:text-xl font-bold my-5 sm:my-10">Search Result ({allJobs.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {allJobs.map((job) => (
            <Job key={job._id} job={job}/>
        ))}
      </div>
    </div>
  )
}

export default Browse