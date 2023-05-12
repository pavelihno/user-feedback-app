import { useEffect, useState, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Base from '../Base';
import { displayErrors, fullWidthStyle } from '../../redux/utils';
import { fetchProductType } from '../../redux/actions/productType';
import { createProduct } from '../../redux/actions/product';


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
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                        {productType?.name}
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <AddCircleOutlineIcon fontSize={'large'} />
                        </Grid>
                        <Grid item style={fullWidthStyle}>
                            <Box component="form" onSubmit={onSubmit} style={fullWidthStyle}>
                                <Grid container spacing={2} style={fullWidthStyle}>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            value={name}
                                            onChange={onNameChange}
                                            error={errors.name ? true : false}
                                            helperText={errors.name ? errors.name : ''}
                                        />
                                    </Grid>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Description"
                                            name="description"
                                            value={description}
                                            onChange={onDescriptionChange}
                                            error={errors.description ? true : false}
                                            helperText={errors.description ? errors.description : ''}
                                        />
                                    </Grid>
                                    <Grid item style={fullWidthStyle}>
                                        <Grid container spacing={2} style={fullWidthStyle} justifyContent="center">
                                            <Grid item style={fullWidthStyle}>
                                                <Grid item>
                                                    <Typography variant="button">Attributes</Typography>
                                                    {errors.attributes && (
                                                        <Grid item style={fullWidthStyle}>
                                                            <Alert icon={false} severity="error">
                                                                {errors.attributes}
                                                            </Alert>
                                                        </Grid>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            {productType?.attributes.map((attribute, index) => {
                                                if (attribute.type === 'enum') {
                                                    return (
                                                        <Grid item style={fullWidthStyle} key={index}>
                                                            <FormControl required fullWidth>
                                                                <InputLabel>{attribute.name}</InputLabel>
                                                                <Select
                                                                    label={attribute.name}
                                                                    name={attribute.key}
                                                                    value={attributes[attribute.key] || ''}
                                                                    onChange={(e) => onAttributeChange(attribute.key, e.target.value)}
                                                                >
                                                                    {attribute.options.map((option, optionIndex) => (
                                                                        <MenuItem value={option} key={optionIndex}>{option}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    )
                                                }
                                                if (attribute.type === 'integer' || attribute.type === 'float') {
                                                    return (
                                                        <Grid item style={fullWidthStyle} key={index}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label={attribute.name}
                                                                name={attribute.key}
                                                                value={attributes[attribute.key] || ''}
                                                                type={'number'}
                                                                onChange={(e) => {
                                                                    const value = attribute.type === 'integer' ? parseInt(e.target.value) : parseFloat(e.target.value);
                                                                    onAttributeChange(attribute.key, value);
                                                                }}
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                                if (attribute.type === 'location') {
                                                    return (
                                                        <Grid item style={fullWidthStyle} key={index}>
                                                            <Box>
                                                                <InputLabel>{attribute.name}</InputLabel>
                                                                <Box>
                                                                    <TextField
                                                                        label="Latitude"
                                                                        value={attributes[attribute.key]?.lat || ''}
                                                                        onChange={(e) => {
                                                                            const value = {
                                                                                ...attributes[attribute.key],
                                                                                lat: parseFloat(e.target.value),
                                                                            };
                                                                            onAttributeChange(attribute.key, value);
                                                                        }}
                                                                    />
                                                                    <TextField
                                                                        label="Longitude"
                                                                        value={attributes[attribute.key]?.long || ''}
                                                                        onChange={(e) => {
                                                                            const value = {
                                                                                ...attributes[attribute.key],
                                                                                long: parseFloat(e.target.value),
                                                                            };
                                                                            onAttributeChange(attribute.key, value);
                                                                        }}
                                                                    />
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    )
                                                }
                                                if (attribute.type === 'boolean') {
                                                    return (
                                                        <Grid item style={fullWidthStyle} key={index}>
                                                            <FormControl required fullWidth>
                                                                <InputLabel>{attribute.name}</InputLabel>
                                                                <Checkbox
                                                                    checked={attributes[attribute.key] || false}
                                                                    onChange={(e) => onAttributeChange(attribute.key, e.target.checked)} />
                                                            </FormControl>
                                                        </Grid>
                                                    )
                                                }
                                                if (attribute.type === 'date') {
                                                    return (
                                                        <Grid item style={fullWidthStyle} key={index}>
                                                            <TextField
                                                                required
                                                                fullWidth
                                                                label={attribute.name}
                                                                name={attribute.key}
                                                                value={attributes[attribute.key] || ''}
                                                                type='date'
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                onChange={(e) => onAttributeChange(attribute.key, e.target.value)}
                                                                InputProps={{
                                                                    inputProps: {
                                                                        min: new Date().toLocaleDateString('ru-RU').split('T')[0],
                                                                    },
                                                                }}
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                                return (
                                                    <Grid item style={fullWidthStyle} key={index}>
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            label={attribute.name}
                                                            name={attribute.key}
                                                            value={attributes[attribute.key] || ''}
                                                            onChange={(e) => {
                                                                let value;
                                                                if (attribute.type === 'list') {
                                                                    value = e.target.value.split(',').map((v) => v.trim());
                                                                } else {
                                                                    value = e.target.value;
                                                                }
                                                                onAttributeChange(attribute.key, value);
                                                            }}
                                                        />
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained" >Create</Button>
                                    </Grid>
                                    {createSuccess && <Grid item style={fullWidthStyle}><Alert>{`${productType.name} created successfully!`}</Alert></Grid>}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>

                </Paper>
            </Container>
        </Base >
    );
};

export default CreateProductForm;