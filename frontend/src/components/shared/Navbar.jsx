import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "../ui/button"
import { LogOut, User2, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { USER_API_END_POINT } from "@/constants/constant"
import { setUser } from "@/redux/authSlice"
import { toast } from "sonner"
import { clearSavedJobs } from "@/redux/savedJobsSlice"

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const user = useSelector((state) => state.auth.User)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(clearSavedJobs())
                dispatch(setUser(null))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer">
                        <Avatar className={'w-15 h-15'}>
                            <AvatarImage src="LOGOJP.webp" />
                        </Avatar>
                        <h1 className="text-l font-bold">Get<span className="text-[#F83002]">&</span><span>Post</span></h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex font-medium items-center gap-5">
                            {user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className="hover:text-blue-600">Companies</Link></li>
                                    <li><Link to="/admin/jobs" className="hover:text-blue-600">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                                    <li><Link to="/jobs" className="hover:text-blue-600">Jobs</Link></li>
                                    <li><Link to="/browse" className="hover:text-blue-600">Browse</Link></li>
                                    {user && (
                                        <li className="text-red-500">
                                            <Link to="/saved-jobs" className="hover:text-red-700">
                                                Saved Jobs
                                            </Link>
                                        </li>
                                    )}
                                </>
                            )}
                        </ul>

                        {!user ? (
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
                                        </div>
                                    </div>
                                    <div className="my-2 text-gray-600">
                                        {user && user.role == 'student' && (
                                            <div className="flex gap-5">
                                                <User2 />
                                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                            </div>
                                        )}
                                        <div className="flex gap-5">
                                            <LogOut />
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    logoutHandler();
                                                }}
                                                variant="link"
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <nav className="flex flex-col space-y-4">
                            {user && user.role == 'recruiter' ? (
                                <>
                                    <Link to="/admin/companies" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Companies</Link>
                                    <Link to="/admin/jobs" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Home</Link>
                                    <Link to="/jobs" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Jobs</Link>
                                    <Link to="/browse" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Browse</Link>
                                    {user && (
                                        <Link to="/saved-jobs" className="block px-3 py-2 text-red-500 hover:bg-gray-100 rounded-md">
                                            Saved Jobs
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                        <div className="mt-4 pt-4 border-t">
                            {!user ? (
                                <div className="flex flex-col gap-2">
                                    <Link to="/login" className="block px-3 py-2 hover:bg-gray-100 rounded-md">Login</Link>
                                    <Link to="/signup" className="block px-3 py-2 bg-[#6A38C2] text-white hover:bg-[#c5bfcb] rounded-md">Signup</Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {user.role == 'student' && (
                                        <Link to="/profile" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                            <User2 className="h-4 w-4" />
                                            View Profile
                                        </Link>
                                    )}
                                    <Button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            logoutHandler();
                                        }}
                                        variant="link"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}