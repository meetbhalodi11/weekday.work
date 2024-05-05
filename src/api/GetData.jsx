import { useState, useEffect } from 'react';

const useGetData = (limit, offset) => {
    const [data, setData] = useState([null]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append('Content-Type', 'application/json');
                const body = JSON.stringify({ limit, offset });
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body,
                };

                const response = await fetch(
                    'https://api.weekday.technology/adhoc/getSampleJdJSON',
                    requestOptions
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                setIsError(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [limit, offset]);

    return { data, isLoading, isError };
};

export default useGetData;