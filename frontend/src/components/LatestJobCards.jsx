/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { Badge } from "./ui/badge"

function LatestJobCards({job}) {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
        <div>
            <h1 className="text-lg font-medium">{job?.company?.name}</h1>
            <p className="text-small text-gray-600">India</p>
        </div>
        <div>
            <h1 className="text-lg font-bold my-2">{job?.title}</h1>
            <p className="text-small text-gray-600 line-clamp-2">{job?.description}</p>
        </div>
        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary} LPA</Badge>
        </div>
    </div>
  )
}

export default LatestJobCards