import { useEffect, useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import Base from '../Base';
import { displayErrors, fullWidthStyle } from '../../redux/utils';
import { fetchAttributeTypes } from '../../redux/actions/attribute';
import { fetchProductType, updateProductType } from '../../redux/actions/productType';


const UpdateProductTypeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                navigate(0);
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
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                        Product category
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <CategoryIcon fontSize={'large'} />
                        </Grid>
                        <Grid item style={fullWidthStyle}>
                            <Box component="form" onSubmit={onSubmit} style={fullWidthStyle}>
                                <Grid container spacing={2} style={fullWidthStyle}>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Category Name"
                                            name="name"
                                            value={name}
                                            onChange={onNameChange}
                                            error={errors.name ? true : false}
                                            helperText={errors.name ? errors.name : ''}
                                        />
                                    </Grid>
                                    <Grid item style={fullWidthStyle}>
                                        <Grid container spacing={2} style={fullWidthStyle} justifyContent="center">
                                            <Grid item style={fullWidthStyle}>
                                                <Grid container style={fullWidthStyle}>
                                                    <Grid item>
                                                        <Typography variant="button">Attributes</Typography>
                                                    </Grid>
                                                    {errors.attributes && <Grid item style={fullWidthStyle}><Alert icon={false} severity="error">{errors.attributes}</Alert></Grid>}
                                                    <Grid item>
                                                        <IconButton onClick={onAddAttribute}>
                                                            <Tooltip title="Add attribute">
                                                                <AddIcon />
                                                            </Tooltip>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {attributes.map((attribute, index) => (
                                                <Grid item style={fullWidthStyle} key={index}>
                                                    <Grid container key={index} style={fullWidthStyle} spacing={1} justifyContent="center">
                                                        <Grid item style={fullWidthStyle}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label="Attribute name"
                                                                name="name"
                                                                value={attribute.name}
                                                                onChange={e => onAttributeChange(index, { name: e.target.value })}
                                                            />
                                                        </Grid>
                                                        <Grid item style={fullWidthStyle}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label="Attribute key"
                                                                name="key"
                                                                value={attribute.key}
                                                                onChange={e => onAttributeChange(index, { key: e.target.value })}
                                                            />
                                                        </Grid>
                                                        <Grid item style={fullWidthStyle}>
                                                            <FormControl required fullWidth>
                                                                <InputLabel>Attribute type</InputLabel>
                                                                <Select label="Attribute type" name="type" value={attribute.type} onChange={e => onAttributeChange(index, { type: e.target.value })}>
                                                                    {attributeTypes.map((type, index) => (
                                                                        <MenuItem value={type} key={index}>{type}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                        {attribute.type === 'enum' && (
                                                            <Grid item style={fullWidthStyle}>
                                                                <TextField
                                                                    fullWidth
                                                                    label="Options (comma separated)"
                                                                    name="options"
                                                                    value={attribute.options ? attribute.options.join(',') : ''}
                                                                    onChange={e => {
                                                                        const values = e.target.value.split(',').map((v) => v.trim());
                                                                        onAttributeChange(index, { options: values });
                                                                    }}
                                                                />
                                                            </Grid>
                                                        )}
                                                        <Grid item style={fullWidthStyle}>
                                                            <IconButton onClick={() => onAttributeDelete(index)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained">Update category</Button>
                                    </Grid>
                                    {updateProductTypeSuccess && <Grid item style={fullWidthStyle}><Alert>Product category updated successfully!</Alert></Grid>}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Base>
    )
};

export default UpdateProductTypeForm;