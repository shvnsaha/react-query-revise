import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchFruits = async ({ pageParam }) => {
    return axios.get(`http://localhost:4000/fruits/?_limit=20&_page=${pageParam}`)
}


const PaginatedQueries = () => {



    const { data, isLoading, isError, error,fetchNextPage,hasNextPage } = useInfiniteQuery({
        queryKey: ['fruits'],
        queryFn: fetchFruits,
        initialPageParam: 1,
        getNextPageParam: (_lastPage, allPages) => {
            if (allPages.length < 6) return allPages.length + 1;
            else {
                return undefined;
            }
        }

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


    console.log(data);

    return (
        <div className='container'>
            {
                data?.pages?.map(page =>{
                    return page?.data.map(fruit => {
                        return (
                            <div key={fruit.id} className='fruit-item'>
                                {fruit.name}
                            </div>
                        )
                    })
                })
            }

            <button onClick={()=>fetchNextPage()} disabled={!hasNextPage}>Load More</button>

        </div>
    );
};

export default PaginatedQueries;