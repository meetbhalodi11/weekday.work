import React, { useEffect, useRef, useState } from 'react'
import JobCard from './JobCard';
import './HomePage.css'
import Filters from './Filters';
// import useFetchData from '../api/useFetchData';

const HomePage = () => {
    const limit = 10
    const [totalCount, setTotalCount] = useState(0)
    const [filters, setFilters] = useState({})
    const [jobList, setJobList] = useState()
    const [hasMore, setHasMore] = useState(true)
    const [offset, setOffset] = useState(0);
    const [filteredJobs, setFilteredJobs] = useState()

    const elementRef = useRef(null)

    const onInteration = (enteris) => {
        const firstEntry = enteris[0]
        if (firstEntry.isIntersecting && hasMore) {
            if (offset <= totalCount)
                fetchMoreItems(offset)
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(onInteration)
        if (observer && elementRef.current) {
            observer.observe(elementRef.current)
        }

        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [jobList])

    const handleFilterChange = (filterFormComponent) => {
        // Apply filters
        setFilters(filterFormComponent)

        let filteredJobsCopy = JSON.parse(JSON.stringify(jobList || []))

        if (filters.minExperience) {
            filteredJobsCopy = filteredJobsCopy.filter(job => job.minExp <= parseInt(filters.minExperience));
        }

        if (filters.companyName) {
            filteredJobsCopy = filteredJobsCopy.filter(job => job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()));
        }

        if (filters.location) {
            filteredJobsCopy = filteredJobsCopy.filter(job => job.location === filters.location);
        }

        // if (filters.remoteOnSite.length > 0) {
        //     filteredJobsCopy = filteredJobsCopy.filter(job => filters.remoteOnSite.includes(job.remoteOnSite));
        // }

        if (filters?.techStack?.length > 0) {
            filteredJobsCopy = filteredJobsCopy.filter(job => filters.techStack.every(stack => job.techStack.includes(stack)));
        }

        if (filters?.role?.length > 0) {
            filteredJobsCopy = filteredJobsCopy.filter(job => filters.role.includes(job.role));
        }

        if (filters.minBasePay) {
            filteredJobsCopy = filteredJobsCopy.filter(job => job.basePay >= parseInt(filters.minBasePay.replace(/\D/g, '')));
        }

        setFilteredJobs(filteredJobsCopy || [])

        if (filteredJobsCopy?.length === 0) {
            setHasMore(false)
        }

    };

    async function fetchMoreItems(offset) {
        const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                limit: 10,
                offset: offset
            }),
        })

        const data = await response.json()

        if (data?.totalCount && !totalCount) {
            setTotalCount(data?.totalCount)
        }

        if (data?.jdList?.length === 0) {
            setHasMore(false)
        } else {
            const newJobs = data?.jdList
            const oldJobs = jobList || []
            const combinedJobs = oldJobs.concat(newJobs)
            setJobList(combinedJobs)
            jobList && setFilteredJobs(JSON.parse(JSON.stringify(jobList)))
            setOffset(prevOffset => prevOffset + limit)
        }
    }

    return (
        <div style={{ height: "100%", overflow: "overlay" }}>
            <Filters onFilterChange={handleFilterChange} />

            {
                <div className='card-container' ref={elementRef}>
                    {
                        filteredJobs && filteredJobs?.length > 0 ?
                            <React.Fragment>
                                {filteredJobs.map((jobObject, index) => (
                                    <JobCard key={jobObject.jdUid || index} jobObject={jobObject} />
                                ))}
                            </React.Fragment> :
                            <React.Fragment>
                                <p>No data found</p>
                            </React.Fragment>
                    }
                </div>
            }
            {
                hasMore && <div ref={elementRef} style={{ fontSize: "2rem", textAlign: "center", fontWeight: 600, padding: "1rem" }}>Loading...</div>
            }
        </div>
    )
}

export default HomePage