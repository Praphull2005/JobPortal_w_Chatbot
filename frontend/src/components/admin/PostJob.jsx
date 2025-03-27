/* eslint-disable react/jsx-key */
import { useState } from "react"
import { Navbar } from "../shared/Navbar"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import axios from "axios"
import { JOB_API_END_POINT } from "@/constants/constant"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"


function PostJob() {
    const companies = useSelector(store => store.company.companies);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const selectChangeHandler = (value) =>{
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId: selectedCompany});
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form onSubmit={submitHandler} className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md">
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>JobType</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input
                                type="text"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent side="bottom" align="center" className="w-[200px] z-[9999] bg-white shadow-lg border">
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }

                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            )
                        }
                    </div>
                    <Button type="submit" className="w-full mt-8 bg-black text-white">Post New Job</Button>
                    {
                        companies.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">Please register a company first, before posting a job.</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob