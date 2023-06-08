import { useEffect, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProductTypeForm from './ProductTypeForm';
import { displayErrors } from '../../redux/utils';
import { fetchAttributeTypes } from '../../redux/actions/attribute';
import { createProductType } from '../../redux/actions/productType';


const CreateProductTypeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const attributeTypes = useSelector(state => state.attribute.attributeTypes);

    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [errors, setErrors] = useState({});
    const [createProductTypeSuccess, setCreateProductTypeSuccess] = useState(false);

    useEffect(() => { dispatch(fetchAttributeTypes()) }, [dispatch]);

    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        dispatch(createProductType({ name, attributes }))
            .unwrap()
            .then(res => {
                setCreateProductTypeSuccess(true);
                setName('');
                setAttributes([]);
                navigate('/productTypes');
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
            actionSuccess={createProductTypeSuccess}
            successMessage={'Product category created successfully!'}
            submitButton={'Create category'}
        />

    );
};

export default CreateProductTypeForm;