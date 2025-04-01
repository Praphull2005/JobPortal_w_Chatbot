import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { RadioGroup } from "../ui/radio-group"
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
            toast.error(error.response?.data?.message || "Signup failed!");
        }
        finally{
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="flex items-center justify-center">
                <form onSubmit={SubmitHandler} className="w-full sm:w-3/4 md:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-4 sm:my-10">
                    <h1 className="font-bold text-xl mb-5">Signup</h1>
                    <div className="mb-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Praphull Rahangdale"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Praphull@gmail.com"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+91 XXXXXXXXXX"
                            className="mt-1"
                        />
                    </div>
                    <div className="mb-4">
                        <Label>Password</Label>
                        <Input
                            type="text"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a strong password."
                            className="mt-1"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                        <RadioGroup>
                            <div className="flex items-center gap-4 my-3">
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
                        <div className="w-full sm:w-auto">
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer mt-1"
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