import { Contact2, Mail, Pen } from "lucide-react"
import { Navbar } from "./shared/Navbar"
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
    UseGetAppliedJobs(); //custom hook
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.auth.User);
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-5 bg-white border border-gray-200 rounded-2xl p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} />
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-medium">{user?.fullname}</h1>
                            <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="text-right"><Pen /></Button>
                </div>
                <div className="my-5">
                    <div className="flex items-center gap-4 my-3">
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 my-3">
                        <Contact2 />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h1 className="font-medium">Skills</h1>
                    <div className="flex items-center gap-2 my-2 flex-wrap">
                        {
                            user?.profile?.skills?.length > 0
                                ? user.profile.skills.map((item, index) => (
                                    <Badge className="bg-gray-900 text-white" key={index}>{item}</Badge>
                                ))
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-medium">Resume</Label>
                    {
                        isResume ? <a target="black" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOrignalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                <h1 className="text-lg font-bold">Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile