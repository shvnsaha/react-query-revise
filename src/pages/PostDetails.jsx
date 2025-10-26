import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const fetchPostDetails = async(postId) =>{
    return axios.get(`http://localhost:4000/posts/${postId}`)
}

const PostDetails = () => {

    const {postId} = useParams();
    console.log(postId);
    const {data, isLoading, isError, error, isFetching, refetch} = useQuery({
        queryKey:["posts",postId],
        queryFn:()=>fetchPostDetails(postId)

    })

       if (isLoading) {
        return <div>Page is Loading</div>
    }
    if (isError) {
        return <div>{error.message} </div>
    }

    const {title,body} = data?.data || {}

    return (
        <div className='post-details-container'>
            <div className='post-details-title'>{title}</div>
            <div className='post-details-body'>{body}</div>
        </div>
    );
};

export default PostDetails;