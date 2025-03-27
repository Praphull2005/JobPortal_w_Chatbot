/* eslint-disable react/no-unescaped-entities */
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

function HeroSection() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const queryHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }

    const keyHandler = (e) => {
        if (e.key == "Enter") {
            queryHandler();
        }
    }
    return (
        <div className="text-center">
            <div className="flex flex-col gap-5 my-10">
                <span className="text-[#F83002] bg-gray-100 rounded-full font-medium mx-auto px-4 py-2">No. 1 Job Hunt Website</span>
                <h1 className="text-5xl font-bold">Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Job</span></h1>
                <p className="text-2xl font-sans">Discover thousands of job opportunities across various industries.</p>

                <div>
                    <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={keyHandler}
                            placeholder="Find your dream jobs"
                            className="outline-none border-none w-full"
                        />
                        <Button onClick={queryHandler} className="rounded-r-full bg-[#6A38C2] cursor-pointer">
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection