import { Contact2, Mail, Pen } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import UseGetAppliedJobs from "@/hooks/UseGetAppliedJobs";

const isResume = true;
function Profile() {
    UseGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.User);
    
    return (
        <div className="px-4 sm:px-6">
            <div className="max-w-4xl mx-auto my-5 bg-white border border-gray-200 rounded-2xl p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 sm:h-24 sm:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>
                            <h1 className="text-lg sm:text-xl font-medium">{user?.fullname}</h1>
                            <p className="text-xs sm:text-sm text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        variant="outline" 
                        className="sm:self-start"
                        size="sm"
                    >
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="my-5 space-y-3">
                    <div className="flex items-center gap-4">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Contact2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm sm:text-base">{user?.phoneNumber}</span>
                    </div>
                </div>
                
                <div className="my-5">
                    <h1 className="font-medium text-sm sm:text-base">Skills</h1>
                    <div className="flex flex-wrap gap-2 my-2">
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (
                                <Badge key={index} className="bg-gray-900 text-white text-xs sm:text-sm">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-sm text-gray-500">NA</span>
                        )}
                    </div>
                </div>
                
                <div className="grid w-full items-center gap-1.5">
                    <Label className="text-sm sm:text-base font-medium">Resume</Label>
                    {isResume ? (
                        <a 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={user?.profile?.resume} 
                            className="text-blue-500 hover:underline text-sm sm:text-base break-all"
                        >
                            {user?.profile?.resumeOrignalName}
                        </a>
                    ) : (
                        <span className="text-sm text-gray-500">NA</span>
                    )}
                </div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 mt-6">
                <h1 className="text-lg font-bold mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile