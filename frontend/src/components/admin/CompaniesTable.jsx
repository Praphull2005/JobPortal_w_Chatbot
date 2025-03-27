import { Edit2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function CompaniesTable() {
   
    const navigate = useNavigate();

    const searchCompanyByText = useSelector(store => store.company.searchCompanyByText);
    const companies = useSelector(store => store.company.companies);
    // console.log("Companies from Redux:", companies);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if(!searchCompanyByText){
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        })

        setFilterCompany(filteredCompany);
    },[companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your recently registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent side="bottom" align="center" className="w-[200px] z-[9999] bg-white shadow-lg border">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-3 w-fit cursor-pointer">
                                                <Edit2 />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable