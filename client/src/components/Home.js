import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchReviews } from '../redux/actions/review';
import ReviewList from './review/ReviewList';


const Home = () => {
    const dispatch = useDispatch();

    const reviews = useSelector(state => state.review.reviews);
    const isLoading = useSelector(state => state.review.isLoading);

    useEffect(() => {
        dispatch(fetchReviews())
    }, []);

    return (
        <ReviewList
            header="Latest reviews"
            reviews={reviews}
            isLoading={isLoading}
        />
    );
};


export default Home;