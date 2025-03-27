/* eslint-disable react/jsx-key */
import { Edit2, Eye, MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function AdminJobTable() {
    const navigate = useNavigate();
    const searchJobByText = useSelector(store => store.job.searchJobByText);
    const allAdminJobs = useSelector(store => store.job.allAdminJobs);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredjob = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if(!searchJobByText){
                return true;
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        })

        setFilterJobs(filteredjob);
    },[allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recently Posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.map((job) => (
                            <TableRow>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover className="w-34">
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent side="bottom" align="center" className="w-[200px] z-[9999] bg-white shadow-lg border">
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex items-center gap-3 w-fit cursor-pointer">
                                                <Edit2 />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-3 w-fit cursor-pointer">
                                                <Eye/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobTable