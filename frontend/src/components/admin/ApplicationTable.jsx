import { MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/constants/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];
function ApplicationTable() {
    const applicants = useSelector(store => store.application.applicants);
    console.log("Applicants data:", applicants); // Debug
  
    const statusHandler = async (status, id) => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
  
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update status");
      }
    };
  
    return (
      <div>
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.applicant?.fullname}</TableCell>
                  <TableCell>{item?.applicant?.email}</TableCell>
                  <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                  <TableCell>{item?.applicant?.profile?.resumeOrignalName}</TableCell>
                  <TableCell>{item?.applicant?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent side="bottom" align="center" className="w-[200px] z-[9999] bg-white shadow-lg border">
                        {shortlistingStatus.map((status, index) => (
                          <div 
                            onClick={() => statusHandler(status, item?._id)} 
                            key={index} 
                            className="flex w-fit items-center my-4 cursor-pointer"
                          >
                            <span>{status}</span>
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  export default ApplicationTable;