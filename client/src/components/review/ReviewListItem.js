import { Link } from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fullWidthStyle, formatDate, MemoizedAvatar, getFilePath } from '../../redux/utils';


const ReviewListItem = ({ review }) => {
    return (
        <Grid item maxWidth="md">
            <Card style={fullWidthStyle}>
                <CardHeader
                    style={fullWidthStyle}
                    avatar={<MemoizedAvatar avatarPath={getFilePath(review.createdBy.avatarPath)} />}
                    title={<Button component={Link} to={`/reviews/${review._id}`} color="inherit">
                        <Typography variant="subtitle1">{review.title}</Typography>
                    </Button>}
                    subheader={`${formatDate(review.createdAt)}`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">{review.text}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ReviewListItem;