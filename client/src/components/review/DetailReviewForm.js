import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import Base from '../Base';
import ProductListItem from '../product/ProductListItem';
import { MemoizedAvatar, formatDate, fullWidthStyle, getFilePath, renderStars } from '../../redux/utils';
import { fetchReview } from '../../redux/actions/review';


const DetailReviewForm = ({ }) => {
    const dispatch = useDispatch();

    const { id: reviewId } = useParams();
    const review = useSelector(state => state.review.review);
    const [product, setProduct] = useState(null);
    const [attachments, setAttachments] = useState([]);

    useEffect(() => {
        dispatch(fetchReview(reviewId));
    }, [dispatch, reviewId]);

    useEffect(() => {
        if (review) {
            setProduct(review.product);
            setAttachments(review.attachments);
        }
    }, [review]);

    return (
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                {
                    review && (
                        <Paper elevation={2} style={{ padding: '2rem' }}>
                            <Grid container direction="column" style={fullWidthStyle}>
                                <Grid item container direction="column" sx={{ ...fullWidthStyle, marginBottom: '20px' }}>
                                    <Grid item>
                                        <Typography variant="h5" align="left" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                            {review.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{ ...fullWidthStyle, marginBottom: '10px' }}>
                                        {renderStars(4)}
                                    </Grid>
                                    <Grid item container sx={{ alignItems: 'center' }}>
                                        <MemoizedAvatar avatarPath={getFilePath(review.createdBy.avatarPath)} />
                                        <Typography variant="subtitle">
                                            {review.createdBy.name}, {formatDate(review.createdAt)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ ...fullWidthStyle, marginBottom: '20px' }}>
                                    {
                                        product && (
                                            <ProductListItem product={product} hasButtons={false} />
                                        )
                                    }
                                </Grid>
                                <Grid item sx={{ ...fullWidthStyle, marginBottom: '20px' }}>
                                    <Typography variant="body1">
                                        {review.text}
                                    </Typography>
                                </Grid>
                                <Grid item container sx={{ ...fullWidthStyle, marginBottom: '1rem', rowGap: '10px', columnGap: '10px' }}>
                                    {attachments && attachments.map((attachment, index) => (
                                        <Card key={index}>
                                            <CardMedia
                                                component="img"
                                                sx={{ maxHeight: 250, maxWidth: 250 }}
                                                image={getFilePath(attachment)}
                                            />
                                        </Card>
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>
                    )
                }
            </Container>
        </Base>
    );
};

export default DetailReviewForm;