import { useNavigate } from "react-router-dom";
import { Navbar } from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { COMPANY_API_END_POINT } from "@/constants/constant";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { name }, {
                Headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setSingleCompany(res.data.company))
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto my-10">
                <div className="my-5">
                    <h1 className="font-bold text-2xl">Your Company Name</h1>
                    <p className="text-gray-500">What would you like to give your company name? you can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="Company Name..."
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10">
                    <Button variant="outline" onClick={() => navigate('/admin/companies')}>Cencel</Button>
                    <Button className="bg-black text-white" onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate