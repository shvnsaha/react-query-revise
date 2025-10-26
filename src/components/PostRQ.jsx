import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PostRQ = () => {

    const { data, isLoading, isError, error ,isFetching,refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: () => {
            return axios.get('http://localhost:4000/post');
        },
        // staleTime: 30000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true,
        enabled: false
    })

    console.log(isLoading,isFetching);

    if (isLoading) {
        return <div>Page is Loading</div>
    }
    if (isError) {
        return <div>{error.message} </div>
    }

    // console.log(data);

    return (
        <div className="post-list">
            <button onClick={refetch}>Fetch Post</button>
            {
                data?.data.map(post => (
                    <div className="post-item" key={post.id}>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-body">{post.body}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default PostRQ;