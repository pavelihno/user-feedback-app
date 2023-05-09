import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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

import { selectIsAuth, selectIsAdmin } from '../../redux/reducers/auth';
import { deleteProductType } from '../../redux/actions/productType';
import { fullWidthStyle } from '../../redux/utils';


const ProductTypeListItem = ({ productType }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);

    const [opened, setOpened] = useState(false);

    const onOpenAtrributes = () => {
        setOpened(!opened);
    };

    return (
        <Grid item maxWidth="md">
            <Card style={fullWidthStyle}>
                <CardHeader
                    style={fullWidthStyle}
                    title={productType.name}
                    subheader={<Fragment>
                        <IconButton onClick={onOpenAtrributes}>
                            <Typography variant="subtitle1">Attributes</Typography>
                            {opened ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Collapse in={opened} unmountOnExit>
                            <Table>
                                <TableBody>
                                    {productType.attributes.map((attribute, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{attribute.name}</TableCell>
                                            <TableCell>{attribute.type}</TableCell>
                                            {attribute.type === 'enum' && (<TableCell>{attribute.options}</TableCell>)}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </Fragment>}
                />
                <CardActions disableSpacing>
                    <IconButton component={Link} to={`/products/new`}>
                        <Tooltip title="Create new product">
                            <AddIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton component={Link} to={'/'}>
                        <Tooltip title="List category products">
                            <ListIcon />
                        </Tooltip>
                    </IconButton>
                    {
                        isAdmin && (
                            <Fragment>
                                <IconButton component={Link} to={`/productTypes/${productType._id}`}>
                                    <Tooltip title="Edit product category">
                                        <EditIcon />
                                    </Tooltip>
                                </IconButton>
                                <IconButton onClick={() => {
                                    if (window.confirm('Are you sure you want to delete product category?')) {
                                        dispatch(deleteProductType(productType._id));
                                        navigate(0);
                                    }
                                }}>
                                    <Tooltip title="Delete product category">
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

export default ProductTypeListItem;