import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { deleteAttachments, fetchReview, updateReview, uploadAttachments } from '../../redux/actions/review';
import ReviewForm from './ReviewForm';


const UpdateReviewForm = () => {
    const dispatch = useDispatch();

    const { id: reviewId } = useParams();

    const review = useSelector(state => state.review.review);
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [errors, setErrors] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchReview(reviewId));
    }, [dispatch, reviewId]);

    useEffect(() => {
        if (review) {
            setProduct(review.product);
            setTitle(review.title);
            setText(review.text);
            setRating(review.rating);
            setAttachments(review.attachments);
        }
    }, [review]);

    const onTitleChange = e => {
        setTitle(e.target.value);
    };

    const onRatingChange = rating => {
        setRating(rating);
    };

    const onTextChange = e => {
        setText(e.target.value);
    };

    const onAttachmentUpload = e => {
        const files = e.target.files;

        dispatch(uploadAttachments({ reviewId, files }))
            .unwrap()
            .then(res => { setAttachments(res); })
            .catch(res => { });
    };

    const onAttachmentDelete = attachment => {
        dispatch(deleteAttachments({ reviewId, attachments: [attachment] }))
            .unwrap()
            .then(res => { setAttachments(res); })
            .catch(res => { });
    };

    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        dispatch(updateReview({ reviewId, title, text, rating }))
            .unwrap()
            .then(res => {
                const review = res;
                setUpdateSuccess(true);
                navigate(`/reviews/${review._id}`);
            })
            .catch(res => { displayErrors(res, setErrors); setUpdateSuccess(false); });
    };

    return (
        <ReviewForm
            product={product}
            isUpdate={true}
            title={title}
            onTitleChange={onTitleChange}
            rating={rating}
            onRatingChange={onRatingChange}
            text={text}
            onTextChange={onTextChange}
            attachments={attachments}
            onAttachmentUpload={onAttachmentUpload}
            onAttachmentDelete={onAttachmentDelete}
            errors={errors}
            onSubmit={onSubmit}
            submitButton="Update"
            isSuccess={updateSuccess}
            successMessage={`Review on ${product?.name} successfully updated!`}
        />
    )
};

export default UpdateReviewForm; 