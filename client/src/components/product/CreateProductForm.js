import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { fetchProductType } from '../../redux/actions/productType';
import { createProduct } from '../../redux/actions/product';
import ProductForm from './ProductForm';


const CreateProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [createSuccess, setCreateSuccess] = useState(false);

    const { id: productTypeId } = useParams();

    const productType = useSelector(state => state.productType.productType);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchProductType(productTypeId));
    }, [dispatch, productTypeId]);

    const onNameChange = e => {
        setName(e.target.value);
    };

    const onDescriptionChange = e => {
        setDescription(e.target.value);
    };

    const onAttributeChange = (key, value) => {
        setAttributes({
            ...attributes,
            [key]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        dispatch(createProduct({ productType: productTypeId, name, description, attributes }))
            .unwrap()
            .then(res => {
                setCreateSuccess(true);
                setName('');
                setDescription('');
                setAttributes({});
                navigate(`/products/${productTypeId}/list`);
            })
            .catch(res => displayErrors(res, setErrors));
    };

    return (
        <ProductForm
            productType={productType}
            onSubmit={onSubmit}
            name={name}
            onNameChange={onNameChange}
            description={description}
            onDescriptionChange={onDescriptionChange}
            errors={errors}
            attributes={attributes}
            onAttributeChange={onAttributeChange}
            isSuccess={createSuccess}
            successMessage={`${name} created successfully!`}
            submitButton={'Create'}
        />
    );
};

export default CreateProductForm;