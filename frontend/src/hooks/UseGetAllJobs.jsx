import { JOB_API_END_POINT } from "@/constants/constant"
import { setAllJobs } from "@/redux/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const UseGetAllJobs = () => {
    const dispatch = useDispatch();
    const searchedQuery = useSelector(store => store.job.searchedQuery);
    useEffect(()=>{
        const fetchAllJobs = async() => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`);
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs))
                }
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchAllJobs();
    },[])
}
export default UseGetAllJobs