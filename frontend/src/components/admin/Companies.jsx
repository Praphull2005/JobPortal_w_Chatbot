import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CompaniesTable from "./CompaniesTable"
import UseGetAllCompanies from "@/hooks/UseGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"


function Companies() {
  UseGetAllCompanies()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input, dispatch])
  return (
    <div>
      
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between my-10 gap-4">
          <div className="w-fit">
            <Input
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button onClick={() => navigate('/admin/companies/create')}
            className="bg-black text-white">New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies