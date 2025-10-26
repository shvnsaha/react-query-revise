import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchFruits = async (pageId) => {
    
    return axios.get(`http://localhost:4000/fruits?_page=${pageId}&_limit=4`)
}


const PaginatedQueries = () => {

    const [page, setPage] = useState(2)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['fruits',page],
        queryFn: () => fetchFruits(page),
        // staleTime: 30000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true,
        // enabled: true
    })

    // console.log(isLoading, isFetching);

    if (isLoading) {
        return <div>Page is Loading</div>
    }
    if (isError) {
        return <div>{error.message} </div>
    }


    console.log(data?.data);

    return (
        <div className='container'>
            {
                data?.data.map(fruit =>
                    <div className='fruit-label'>
                        {fruit.name}
                    </div>
                )
            }
            <button onClick={() => setPage(prev => prev - 1)} disabled={page == 0 ? true : false}>Prev</button>
            <button onClick={() => setPage(prev => prev + 1)} disabled={page == 5 ? true : false}>Next</button>
        </div>
    );
};

export default PaginatedQueries;