import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import UseGetAllJobs from "@/hooks/UseGetAllJobs"; // Ensure correct path
import { Typewriter } from "react-simple-typewriter";

function LatestJobs() {
  UseGetAllJobs(); // Call the hook to fetch jobs
  const allJobs = useSelector((store) => store.job.allJobs);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">
          <Typewriter
            words={["Latest & Top Job Openings", "Find Your Dream Job Today!"]}
            loop={Infinity}
            cursor
            cursorStyle="_"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-10">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
