import { JOB_API_END_POINT } from "@/constants/constant"
import { setAllAdminJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const UseGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/admin/get`, {withCredentials: true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllAdminJobs();
    },[])
}
export default UseGetAllAdminJobs