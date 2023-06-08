import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { fetchProduct } from '../../redux/actions/product';
import ReviewList from './ReviewList';
import { fetchProductReviews } from '../../redux/actions/review';


const ProductReviewList = () => {
    const dispatch = useDispatch();
    const { id: productId } = useParams();

    const product = useSelector(state => state.product.product);
    const reviews = useSelector(state => state.review.reviews);
    const isLoading = useSelector(state => state.review.isLoading);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        dispatch(fetchProductReviews(productId))
    }, [dispatch, productId]);

    return (
        <ReviewList
            header="Reviews"
            subheader={`${product?.name}`}
            reviews={reviews}
            isLoading={isLoading}
        />
    );
};

export default ProductReviewList;