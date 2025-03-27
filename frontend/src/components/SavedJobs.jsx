import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import { useEffect } from "react";
import { fetchSavedJobs } from "@/redux/authSlice";
import { clearSavedJobs } from "@/redux/savedJobsSlice";

function SavedJobs() {
    const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.User);

    useEffect(() => {
        if (user) {
          dispatch(fetchSavedJobs());
        } else {
          dispatch(clearSavedJobs());
        }
      }, [dispatch, user]);

    console.log("Saved Jobs in Component:", savedJobs); // Debugging log

    return (
        <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
            {savedJobs.length === 0 ? (
                <p className="text-gray-500">You have no saved jobs.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavedJobs;