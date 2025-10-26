import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const fetchFruits = async ({ pageParam = 1 }) => {
  const res = await axios.get(`http://localhost:4000/fruits?_limit=20&_page=${pageParam}`);
  return res.data;
};

const PaginatedQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['fruits'],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If fewer than 20 items were returned, we've reached the end
      if (lastPage.length < 20) return undefined;
      return allPages.length + 1;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoading) return <div>Page is loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      {data?.pages?.map((page, i) => (
        <div key={i}>
          {page.map((fruit) => (
            <div key={fruit.id} className="fruit-item">
              {fruit.name}
            </div>
          ))}
        </div>
      ))}

      <div ref={ref} style={{ height: '30px' }} />

      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>No more fruits to load 🍎</p>}
    </div>
  );
};

export default PaginatedQueries;
