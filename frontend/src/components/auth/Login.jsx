import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
import { Navbar } from "../shared/Navbar"
import { useState } from "react"
import axios from "axios"
import { USER_API_END_POINT } from "@/constants/constant"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { fetchSavedJobs, setLoading, setUser } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((Store) => Store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(input);

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(fetchSavedJobs());
                dispatch(setUser(res.data.user));
                localStorage.setItem("token", res.data.token);
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={SubmitHandler} className="w-1/2 border border-gray-200 rounded-md p-6 my-10">
                    <h1 className="font-bold text-xl mb-5">Login</h1>

                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input?.email || ""}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <div>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input?.password || ""}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <RadioGroup>
                            <div className="flex items-center gap-4 my-5">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input?.role === "student"}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="option-one">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input?.role === "recruiter"}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="option-two">Recruiter</Label>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    {isLoading ? (
                        <Button className="bg-black text-white w-full my-4 cursor-pointer">
                            <Loader2 className="mr-2 h-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="bg-black text-white w-full my-4 cursor-pointer">
                            Login
                        </Button>
                    )}

                    <span className="text-sm">
                        Do not have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-bold">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Login;
