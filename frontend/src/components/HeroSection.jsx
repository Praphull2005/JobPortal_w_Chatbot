import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"

function HeroSection() {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const queryHandler = () => {
        dispatch(setSearchedQuery(query))
        navigate('/browse')
    }

    const keyHandler = (e) => {
        if (e.key == "Enter") {
            queryHandler()
        }
    }
    
    return (
        <div className="text-center px-4 sm:px-6">
            <div className="flex flex-col gap-5 my-10 max-w-4xl mx-auto">
                <span className="text-[#F83002] bg-gray-100 rounded-full font-medium mx-auto px-4 py-2 text-sm sm:text-base">No. 1 Job Hunt Website</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Job</span></h1>
                <p className="text-lg sm:text-xl md:text-2xl font-sans">Discover thousands of job opportunities across various industries.</p>

                <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 mx-auto">
                    <div className="flex w-full shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4">
                        <input
                            type="text"
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={keyHandler}
                            placeholder="Find your dream jobs"
                            className="outline-none border-none w-full py-2 text-sm sm:text-base"
                        />
                        <Button onClick={queryHandler} className="rounded-r-full bg-[#6A38C2] cursor-pointer h-full">
                            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection