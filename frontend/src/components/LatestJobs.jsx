import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import UseGetAllJobs from "@/hooks/UseGetAllJobs";
import { Typewriter } from "react-simple-typewriter";

function LatestJobs() {
  UseGetAllJobs();
  const allJobs = useSelector((store) => store.job.allJobs);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 my-12 sm:my-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-10">
        {allJobs.length <= 0 ? (
          <span className="col-span-full text-center">No Job Available</span>
        ) : (
          allJobs?.slice(0, 6).map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;