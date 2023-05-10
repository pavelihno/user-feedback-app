import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { selectIsAuth, selectIsAdmin } from '../../redux/reducers/auth';
import { fullWidthStyle } from '../../redux/utils';
import { approveProduct, deleteProduct } from '../../redux/actions/product';


const ProductListItem = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.auth.currentUser);
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);

    const productTypeAttributes = product.productType.attributes;
    const attributeMap = productTypeAttributes.reduce((map, attribute) => {
        map[attribute.key] = attribute.name;
        return map;
    }, {});

    return (
        <Grid item maxWidth="md">
            <Card style={fullWidthStyle}>
                <CardHeader
                    style={fullWidthStyle}
                    title={product.name}
                    subheader={
                        Object.keys(product.attributes).map(key => {
                            return <Typography><u>{`${attributeMap[key]}`}</u>{`: ${product.attributes[key].join(', ')}`}</Typography>
                        })
                    }
                />
                <CardActions disableSpacing>
                    {
                        isAuth && (
                            <IconButton component={Link} to={`/reviews/${product._id}/new`}>
                                <Tooltip title="Create new review">
                                    <AddIcon />
                                </Tooltip>
                            </IconButton>
                        )
                    }
                    <IconButton component={Link} to={`/reviews/${product._id}/list`}>
                        <Tooltip title="List reviews">
                            <ListIcon />
                        </Tooltip>
                    </IconButton>
                    {
                        isAuth && !product.isApproved && !product.approvedBy.includes(currentUser._id) && (
                            <IconButton onClick={() => {
                                if (window.confirm('Are you sure you want to approve product?')) {
                                    dispatch(approveProduct(product._id));
                                    // navigate(0);
                                }
                            }}>
                                <Tooltip title="Approve product">
                                    <CheckCircleOutlineIcon />
                                </Tooltip>
                            </IconButton>
                        )
                    }
                    {
                        isAuth && !product.isApproved && product.approvedBy.includes(currentUser._id) && (
                            <IconButton>
                                <Tooltip title="You approved product">
                                    <CheckCircleIcon />
                                </Tooltip>
                            </IconButton>
                        )
                    }
                    {
                        product.isApproved && (
                            <IconButton>
                                <Tooltip title="Product is approved">
                                    <CheckCircleIcon color="success" />
                                </Tooltip>
                            </IconButton>
                        )
                    }
                    {
                        isAdmin && (
                            <Fragment>
                                <IconButton component={Link} to={`/product/${product._id}`}>
                                    <Tooltip title="Edit product">
                                        <EditIcon />
                                    </Tooltip>
                                </IconButton>
                                <IconButton onClick={() => {
                                    if (window.confirm('Are you sure you want to delete product?')) {
                                        dispatch(deleteProduct(product._id));
                                        navigate(0);
                                    }
                                }}>
                                    <Tooltip title="Delete product">
                                        <DeleteIcon />
                                    </Tooltip>
                                </IconButton>
                            </Fragment>
                        )
                    }
                </CardActions>
            </Card >
        </Grid>
    );
};

export default ProductListItem;