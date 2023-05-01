import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';


const Base = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <IconButton component={Link} to="/" edge="start" aria-label="menu">
                                <img src="/logo.png" alt="Logo" width="50" height="50" />
                            </IconButton>
                            <Button component={Link} to="/" variant="h6">Opinionator</Button>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                                <Grid item>
                                    <Button component={Link} to="/login" color="inherit">
                                        <Typography variant="h7">Login</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button component={Link} to="/register" color="inherit">
                                        <Typography variant="h7">Register</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
                {children}
            </Container>
            <Container component="footer">
                <Typography variant="body2" align="center">
                    <Link to="https://t.me/pavelihno">
                        {`Copyright © Opinionator ${new Date().getFullYear()}.`}
                    </Link>
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default Base;
