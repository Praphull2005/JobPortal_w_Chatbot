import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { LogOut, User2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/constants/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { clearSavedJobs } from "@/redux/savedJobsSlice"


export const Navbar = () => {
    const user = useSelector((state) => state.auth.User);
    // const savedJobs = useSelector(store => store.savedJobs.savedJobs);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(clearSavedJobs());
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);

        }
    }
    return (
        <div className="bg-white">
            <div className="flex justify-between items-center mx-auto max-w-7xl h-16 my-2">
                <div onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer">
                    <Avatar className={'w-15 h-15'}>
                        <AvatarImage src="LOGOJP.webp" />
                    </Avatar>
                    <h1 className="text-l font-bold">Get<span className="text-[#F83002]">&</span><span>Post</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                    {user && (
                                        <li className="text-red-500">
                                            <Link to="/saved-jobs">
                                                Saved Jobs 
                                            </Link>
                                        </li>
                                    )}

                                </>
                            )
                        }

                    </ul>
                    {
                        !user ? ( //Agar user nahi hoga to Signup or login display hoga
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] text-white hover:bg-[#c5bfcb]">Signup</Button></Link>
                            </div>

                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className={'cursor-pointer'}>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent side="bottom" align="center" className="z-[9999] bg-white shadow-lg border">
                                    <div className="flex gap-5 space-y-2">
                                        <div>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            {/* <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</p> */}
                                        </div>
                                    </div>
                                    <div className="my-2 text-gray-600">
                                        {
                                            user && user.role == 'student' && (
                                                <div className="flex gap-5">
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }
                                        <div className="flex gap-5">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }



                </div>
            </div>
        </div>
    )
}
