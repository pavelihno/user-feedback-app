import { useEffect, useState, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductTypeForm from './ProductTypeForm';
import { displayErrors } from '../../redux/utils';
import { fetchAttributeTypes } from '../../redux/actions/attribute';
import { fetchProductType, updateProductType } from '../../redux/actions/productType';


const UpdateProductTypeForm = () => {
    const dispatch = useDispatch();
    const { id: productTypeId } = useParams();
    const attributeTypes = useSelector(state => state.attribute.attributeTypes);

    const productType = useSelector(state => state.productType.productType);
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [errors, setErrors] = useState({});
    const [updateProductTypeSuccess, setUpdateProductTypeSuccess] = useState(false);

    useEffect(() => {
        dispatch(fetchAttributeTypes());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProductType(productTypeId));
    }, [dispatch, productTypeId]);

    useEffect(() => {
        if (productType) {
            setName(productType.name);
            setAttributes(productType.attributes);
        }
    }, [productType]);

    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        dispatch(updateProductType({ productTypeId, name, attributes }))
            .unwrap()
            .then(res => {
                setUpdateProductTypeSuccess(true);
            })
            .catch(res => displayErrors(res, setErrors));
    };

    const onNameChange = e => {
        setName(e.target.value);
    };

    const onAddAttribute = () => {
        const newAttributes = [...attributes];
        newAttributes.push({ name: '', key: '', type: '', options: [] });
        setAttributes(newAttributes);
    };

    const onAttributeChange = (index, updatedAttribute) => {
        const newAttributes = [...attributes];
        newAttributes[index] = {
            ...newAttributes[index],
            ...updatedAttribute,
        };
        setAttributes(newAttributes);
    };

    const onAttributeDelete = (index) => {
        const newAttributes = [...attributes];
        newAttributes.splice(index, 1);
        setAttributes(newAttributes);
    };

    return (
        <ProductTypeForm
            onSubmit={onSubmit}
            name={name}
            onNameChange={onNameChange}
            attributes={attributes}
            onAddAttribute={onAddAttribute}
            onAttributeChange={onAttributeChange}
            onAttributeDelete={onAttributeDelete}
            attributeTypes={attributeTypes}
            errors={errors}
            actionSuccess={updateProductTypeSuccess}
            successMessage={'Product category updated successfully!'}
            submitButton={'Update category'}
        />

    );
};

export default UpdateProductTypeForm;