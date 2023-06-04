import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import Base from "../Base";
import { fullWidthStyle } from '../../redux/utils';

const ReviewList = ({ header, subheader, reviews, isLoading = true }) => {
    return (
        <Base>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '1rem' }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography variant="h5" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                {header}
                            </Typography>
                            {
                                subheader && (
                                    <Typography variant="subtitle" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                                        {subheader}
                                    </Typography>
                                )
                            }
                        </Grid>
                        <Grid container sx={{ marginTop: '1.5rem' }} spacing={5} maxWidth="lg">
                            {!isLoading ? (reviews.map((review, index) => (
                                <Card key={index}>123</Card>
                            ))) : (Array.from({ length: 4 }).map((_, index) => (
                                <Grid item maxWidth="lg" key={index} style={{ minWidth: '17rem' }}>
                                    <Card style={fullWidthStyle}><Skeleton variant="rounded" style={{ ...fullWidthStyle, minHeight: '20rem' }} /></Card>
                                </Grid>
                            )))}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Base>
    )
};

export default ReviewList; 