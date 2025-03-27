import { useNavigate } from "react-router-dom"
import { Navbar } from "../shared/Navbar"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AdminJobTable from "./AdminJobTable"
import UseGetAllAdminJobs from "@/hooks/UseGetAllAdminJobs"
import { setSearchJobByText } from "@/redux/jobSlice"


function AdminJobs() {
  UseGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-10 gap-4">
          <div className="w-fit">
            <Input
              placeholder="Filter by name, role"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate('/admin/jobs/create')}
            className="bg-black text-white">New Job</Button>
        </div>
        <AdminJobTable/>
      </div>
    </div>
  )
}

export default AdminJobs