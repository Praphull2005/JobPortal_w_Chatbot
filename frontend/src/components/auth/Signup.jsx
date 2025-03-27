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
import { Loader2 } from "lucide-react"
import { setLoading } from "@/redux/authSlice"


function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { isLoading } = useSelector((Store) => Store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        console.log(input)

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        // Debugging: Log all FormData values
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Signup Error:", error);

            if (error.response) {
                console.error("Response Data:", error.response.data);
                console.error("Response Status:", error.response.status);
            }

            toast.error(error.response?.data?.message || "Signup failed!");
        }
        finally{
            dispatch(setLoading(false));
        }
    };


    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={SubmitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
                    <h1 className="font-bold text-xl mb-5">Signup</h1>
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Praphull Rahangdale"
                        />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Praphull@gmail.com"
                        />
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+91 XXXXXXXXXX"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            type="text"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a strong password."
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
                                        checked={input.role === 'student'}
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
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="option-two">Recruiter</Label>
                                </div>
                            </div>
                        </RadioGroup>
                        <div>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {isLoading ? (
                        <Button className="bg-black text-white w-full my-4 cursor-pointer">
                            <Loader2 className="mr-2 h-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="bg-black text-white w-full my-4 cursor-pointer">
                            Sign up
                        </Button>
                    )} 
                    <span className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup