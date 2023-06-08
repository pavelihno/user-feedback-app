import { useRef } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DeleteIcon from '@mui/icons-material/Delete';

import Base from '../Base';
import ProductListItem from '../product/ProductListItem';
import { fullWidthStyle, renderStars, getFilePath } from '../../redux/utils';


const ReviewForm = ({
    product,
    isUpdate = false,
    title, onTitleChange,
    rating, onRatingChange,
    text, onTextChange,
    attachments, onAttachmentUpload, onAttachmentDelete,
    errors,
    onSubmit, submitButton, isSuccess, successMessage
}) => {

    const attachmentsInputRef = useRef(null);

    const onStarClick = (index) => {
        onRatingChange(index + 1);
    };

    const onAttachmentUploadClick = () => {
        document.getElementById('attachments').click();
    };

    return (
        <Base>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                        Review
                    </Typography>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <RateReviewIcon fontSize={'large'} />
                        </Grid>

                        <Grid item style={fullWidthStyle}>
                            <Grid container spacing={2} style={fullWidthStyle}>
                                <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                    {
                                        product && (
                                            <ProductListItem product={product} hasButtons={false} />
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item style={fullWidthStyle}>
                            <Box component="form" onSubmit={onSubmit} style={fullWidthStyle}>
                                <Grid container spacing={2} style={fullWidthStyle}>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Title"
                                            name="title"
                                            value={title || ''}
                                            onChange={onTitleChange}
                                            error={errors.title ? true : false}
                                            helperText={errors.title ? errors.title : ''}
                                        />
                                    </Grid>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        {renderStars(rating, onStarClick)}
                                    </Grid>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <TextField
                                            multiline
                                            rows={10}
                                            label="Text"
                                            fullWidth
                                            name="text"
                                            value={text || ''}
                                            onChange={onTextChange}
                                            error={errors.text ? true : false}
                                            helperText={errors.text ? errors.text : ''}
                                        />
                                    </Grid>
                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                        <Button type="submit" variant="contained" >{submitButton}</Button>
                                    </Grid>
                                    {isSuccess && <Grid item style={fullWidthStyle}><Alert>{successMessage}</Alert></Grid>}
                                    {
                                        isUpdate && (
                                            <Grid container item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                                <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                                    <input
                                                        multiple
                                                        id="attachments"
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        style={{ display: 'none' }}
                                                        onChange={onAttachmentUpload}
                                                        ref={attachmentsInputRef}
                                                    />
                                                    <Grid item style={{ ...fullWidthStyle, marginBottom: '1rem' }}>
                                                        <Button variant="contained" color="secondary" onClick={onAttachmentUploadClick} >Add attachments</Button>
                                                    </Grid>
                                                </Grid>
                                                <Grid container style={{ ...fullWidthStyle, marginBottom: '1rem', rowGap: '10px', columnGap: '10px' }}>
                                                    {attachments && attachments.map((attachment, index) => (
                                                        <Card key={index}>
                                                            <CardActions sx={{ justifyContent: 'end' }}>
                                                                <IconButton onClick={() => onAttachmentDelete(attachment)}>
                                                                    <DeleteIcon sx={{ maxHeight: '25px' }} />
                                                                </IconButton>
                                                            </CardActions>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{ maxHeight: 250, maxWidth: 250 }}
                                                                image={getFilePath(attachment)}
                                                            />
                                                        </Card>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Base>
    );
};

export default ReviewForm;