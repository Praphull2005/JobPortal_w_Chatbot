import { useEffect } from "react"
import { Navbar } from "../shared/Navbar"
import ApplicationTable from "./ApplicationTable"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/constants/constant"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setApplicants } from "@/redux/applicationSlice"

function Applicants() {
    const params = useParams();
    const dispatch = useDispatch();
    const applicants = useSelector(store => store.application.applicants);
    // console.log(applicants?.applications.length)

    useEffect(()=>{
        const fetchApplicants = async () =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {withCredentials: true});
                dispatch(setApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplicants();
    },[])
    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <h1 className="text-xl font-bold my-5">Applicants ({applicants?.applications.length})</h1>
                <ApplicationTable/>
            </div>
        </div>
    )
}

export default Applicants