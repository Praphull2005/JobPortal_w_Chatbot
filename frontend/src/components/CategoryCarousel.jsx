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
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-15">
                <CarouselContent>
                    {
                        category.map((cat) => (
                            // eslint-disable-next-line react/jsx-key
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <Button onClick={() => queryHandler(cat)} variant="outline" className="rounded-full cursor-pointer">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel