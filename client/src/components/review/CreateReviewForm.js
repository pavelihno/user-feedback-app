import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { fetchProduct } from '../../redux/actions/product';
import { createReview } from '../../redux/actions/review';
import ReviewForm from './ReviewForm';


const CreateReviewForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id: productId } = useParams();

    const product = useSelector(state => state.product.product);
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(1);
    const [text, setText] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [errors, setErrors] = useState({});
    const [createSuccess, setCreateSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId]);

    const onTitleChange = e => {
        setTitle(e.target.value);
    };

    const onRatingChange = rating => {
        setRating(rating);
    };

    const onTextChange = e => {
        setText(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        dispatch(createReview({ title, text, rating, product: productId }))
            .unwrap()
            .then(res => {
                const review = res;
                setCreateSuccess(true);
                setTitle('');
                setRating(0);
                setText('');
                navigate(`/reviews/${review._id}`);
            })
            .catch(res => displayErrors(res, setErrors));
    };

    return (
        <ReviewForm
            product={product}
            title={title}
            onTitleChange={onTitleChange}
            rating={rating}
            onRatingChange={onRatingChange}
            text={text}
            onTextChange={onTextChange}
            attachments={attachments}
            errors={errors}
            onSubmit={onSubmit}
            submitButton="Create"
            isSuccess={createSuccess}
            successMessage={`Review on ${product?.name} successfully created!`}
        />
    )
};

export default CreateReviewForm; 