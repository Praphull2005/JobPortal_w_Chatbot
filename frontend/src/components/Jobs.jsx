import { useSelector } from "react-redux";
import FilterCard from "./FilterCard"
import Job from "./Job";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='w-full lg:w-1/4'>
                    <FilterCard />
                </div>
                {
                    filterJobs.length <= 0 ? (
                        <div className="w-full text-center py-10">
                            <span className="text-lg">No jobs found matching your criteria</span>
                        </div>
                    ) : (
                        <div className='flex-1'>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                                {
                                    filterJobs.map((job) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            key={job?._id}>
                                            <Job job={job} />
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Jobs