import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';

import { selectIsAuth, selectIsAdmin } from '../../redux/reducers/auth';


const ProductTypeListItem = ({ productType }) => {
    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);

    const [opened, setOpened] = useState(false);

    const onClick = () => {
        setOpened(!opened);
    };

    return (
        <Card style={{ width: "100%" }}>
            <CardHeader
                title={productType.name}
                subheader={<Fragment>
                    <IconButton onClick={onClick}>
                        <Typography variant="subtitle1">Attributes</Typography>
                        {opened ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <Collapse in={opened} unmountOnExit>
                        <Table>
                            <TableBody>
                                {productType.attributes.map((attribute) => (
                                    <TableRow key={attribute.key}>
                                        <TableCell>{attribute.name}</TableCell>
                                        <TableCell>{attribute.type}</TableCell>
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
                <IconButton component={Link} to={`/productTypes/${productType._id}`}>
                    <Tooltip title="List category products">
                        <ListIcon />
                    </Tooltip>
                </IconButton>
                {
                    isAdmin && (
                        <IconButton component={Link} to={`/productTypes/${productType._id}/edit`}>
                            <Tooltip title="Edit product category">
                                <EditIcon />
                            </Tooltip>
                        </IconButton>
                    )
                }
            </CardActions>
        </Card>
    );
};

export default ProductTypeListItem;