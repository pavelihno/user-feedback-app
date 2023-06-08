import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fullWidthStyle, formatDate, MemoizedAvatar, getFilePath, renderStars } from '../../redux/utils';


const ReviewListItem = ({ review }) => {
    return (
        <Grid item maxWidth="md">
            <Card style={fullWidthStyle}>
                <CardHeader
                    style={fullWidthStyle}
                    avatar={<MemoizedAvatar avatarPath={getFilePath(review.createdBy.avatarPath)} />}
                    title={
                        <Grid container direction="column">
                            <Grid item>
                                <Link to={`/reviews/${review._id}`}>
                                    <Typography variant="subtitle1" color="text.primary" sx={{ textDecoration: 'underline' }}>{review.title}</Typography>
                                </Link>
                            </Grid>
                            <Grid item color="text.primary">
                                {renderStars(review.rating)}
                            </Grid>
                        </Grid>
                    }
                    subheader={`${formatDate(review.createdAt)}`}
                />
                <CardContent>
                    <Link to={`/reviews/${review.product._id}/list`}>
                        <Typography variant="body1" color="text.primary" sx={{ textDecoration: 'underline' }}>{review.product.name}</Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">{review.text}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ReviewListItem;