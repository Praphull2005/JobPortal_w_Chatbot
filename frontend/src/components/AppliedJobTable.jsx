import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

function AppliedJobTable() {
    const allAppliedJobs = useSelector(store => store.job.allAppliedJobs);
    const appliedJobsArray = Array.isArray(allAppliedJobs) ? allAppliedJobs : [allAppliedJobs];

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead className="hidden sm:table-cell">Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {appliedJobsArray.length > 0 ? (
                        appliedJobsArray.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="font-medium">
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell>{appliedJob?.job?.title}</TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    {appliedJob?.job?.company?.name}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        className={`
                                            ${appliedJob?.status === "rejected" ? 'bg-red-400' : 
                                            appliedJob?.status === 'pending' ? 'bg-gray-400' :
                                            'bg-green-400'}
                                            text-xs sm:text-sm
                                        `}
                                    >
                                        {appliedJob?.status?.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8">
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