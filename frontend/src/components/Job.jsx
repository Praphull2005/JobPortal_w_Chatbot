/* eslint-disable react/prop-types */
import { Bookmark } from "lucide-react"
import { Button } from "./ui/button"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addJob, removeJob } from "@/redux/savedJobsSlice"
import { USER_API_END_POINT } from "@/constants/constant"

function Job({ job }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.User);

    const savedJobs = useSelector(store => store.savedJobs.savedJobs);
    const isSaved = savedJobs.some((savedJob) => savedJob._id === job._id);

    const toggleSaveJob = async () => {
        if (!user) {
            alert("Please log in to save jobs.");
            return;
        }

        try {
            if (isSaved) {
                const token = localStorage.getItem("token"); // Adjust based on how your auth works
                await axios.delete(`${USER_API_END_POINT}/unbookmark/${job._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                dispatch(removeJob(job._id));
            } else {
                const token = localStorage.getItem("token"); // Adjust based on how your auth works
                console.log(token);

                await axios.post(`${USER_API_END_POINT}/bookmark/${job._id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                },

                );
                dispatch(addJob(job));
            }
        } catch (error) {
            console.error("Error saving job:", error);
        }
    };

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const timeDiff = currentTime - createdAt;
        return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="bg-white border border-gray-100 rounded-md shadow-xl p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt) == 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                    onClick={toggleSaveJob}
                >
                    <Bookmark className={isSaved ? "text-blue-500" : ""} />
                </Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="text-lg font-medium">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-600">India</p>
                </div>
            </div>
            <div>
                <h1 className="text-lg font-bold my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] text-white" onClick={toggleSaveJob}>
                    {isSaved ? "Unsave" : "Save For Later"}
                </Button>

            </div>
        </div>
    )
}

export default Job