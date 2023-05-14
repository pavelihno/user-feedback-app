import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { displayErrors } from '../../redux/utils';
import { fetchProduct, updateProduct } from '../../redux/actions/product';
import ProductForm from './ProductForm';


const UpdateProductForm = () => {
    const dispatch = useDispatch();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const { id: productId } = useParams();

    const product = useSelector(state => state.product.product);
    const [productType, setProductType] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setProductType(product.productType);
            setName(product.name);
            setDescription(product.description);
            setAttributes(product.attributes);
        }
    }, [product]);

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
        dispatch(updateProduct({ productId, name, description, attributes }))
            .unwrap()
            .then(res => {
                setUpdateSuccess(true);
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
            isSuccess={updateSuccess}
            successMessage={`${name} updated successfully!`}
            submitButton={'Update'}
        />
    );
};

export default UpdateProductForm;