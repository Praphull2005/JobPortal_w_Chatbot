import { useDispatch } from "react-redux";
import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Software Engineer",
]

function CategoryCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const queryHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    }
    
    return (
        <div className="px-4 sm:px-6">
            <Carousel className="w-full max-w-4xl mx-auto my-8 sm:my-12">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/4">
                            <Button 
                                onClick={() => queryHandler(cat)} 
                                variant="outline" 
                                className="rounded-full w-full text-xs sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis px-2"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel