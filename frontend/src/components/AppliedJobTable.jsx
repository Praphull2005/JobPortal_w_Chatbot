import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

function AppliedJobTable() {
    const allAppliedJobs = useSelector(store => store.job.allAppliedJobs);
    const appliedJobsArray = Array.isArray(allAppliedJobs) ? allAppliedJobs : [allAppliedJobs];

    console.log(allAppliedJobs);

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(appliedJobsArray) && appliedJobsArray.length > 0 ? (
                        appliedJobsArray.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedJob?.status == "rejected" ? 'bg-red-400' : appliedJob.status == 'pending' ? 'bg-gray-400' :'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center">
                                You have not applied for any job yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable