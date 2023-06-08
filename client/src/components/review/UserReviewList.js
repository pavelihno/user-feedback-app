import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserReviews } from '../../redux/actions/review';
import ReviewList from './ReviewList';


const UserReviewList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.currentUser);

    const reviews = useSelector(state => state.review.reviews);
    const isLoading = useSelector(state => state.review.isLoading);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserReviews(user._id))
        }
    }, [user]);

    return (
        <ReviewList
            header="My reviews"
            reviews={reviews}
            isLoading={isLoading}
        />
    );
};

export default UserReviewList;