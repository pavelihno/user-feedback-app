import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { fetchProduct } from '../../redux/actions/product';
import ReviewList from './ReviewList';


const UserReviewList = () => {

    

    return (
        <ReviewList
            header="My reviews"
        />
    );
};

export default UserReviewList;