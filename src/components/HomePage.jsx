import React, { useState } from 'react'
import useGetData from '../api/GetData';
import JobCard from './JobCard';
import './HomePage.css'

const HomePage = () => {
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const { data, isLoading, error } = useGetData(limit, offset);

    const handleLoadMore = () => {
        setOffset(offset + limit);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='card-container'>
            {
                data && data?.jdList?.length > 0 ?
                    <React.Fragment>
                        {data.jdList.map((jobObject, index) => (
                            <JobCard key={index} jobObject={jobObject} />
                        ))}
                    </React.Fragment> :
                    <React.Fragment>
                        <p>No data found</p>
                    </React.Fragment>
            }
        </div>
    )
}

export default HomePage