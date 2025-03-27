import CategoryCarousel from "./CategoryCarousel"
import Footer from "./shared/Footer"
import HeroSection from "./HeroSection"
import LatestJobs from "./LatestJobs"
import { Navbar } from "./shared/Navbar"
import UseGetAllJobs from "@/hooks/UseGetAllJobs"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AIButton from "./AI/AIButton"

function Home() {
  UseGetAllJobs();
  const user = useSelector(store => store.auth.User);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user?.role === 'recruiter'){
      navigate('/admin/companies')
    }
  }, [])

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/> 
        <AIButton/> {/* Add this line */}
         
    </div>
  )
}

export default Home