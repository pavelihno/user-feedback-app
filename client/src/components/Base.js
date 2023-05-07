import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { ThemeProvider } from '@mui/material/styles';

import theme from '../theme';
import { selectIsAuth, selectIsAdmin } from '../redux/reducers/auth';
import { logout } from '../redux/actions/auth';
import SearchBar from './SearchBar';
import ProductDropMenu from './ProductDropMenu';
import AdministrationDropMenu from './AdministrationDropMenu';


const Base = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.auth.currentUser);
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin);


    const onClickLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            dispatch(logout());
            return navigate('/');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <IconButton component={Link} to="/" edge="start" aria-label="menu">
                                <img src="/images/logo.png" alt="Logo" width="50" height="50" />
                            </IconButton>
                            <Button component={Link} to="/" variant="h6">Opinionator</Button>
                        </Grid>
                        <Grid item >
                            <Grid container spacing={2} alignItems="center" justifyContent="space-around">
                                <SearchBar />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2} alignItems="center" justifyContent="space-around">
                                <Grid item><ProductDropMenu /></Grid>
                                {
                                    isAuth && (<Grid item><Button component={Link} color="inherit">My reviews</Button></Grid>)
                                }
                                {
                                    isAdmin && (
                                        <Grid item><AdministrationDropMenu /></Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            {
                                !isAuth ? (
                                    <Grid container spacing={2} alignItems="center" justifyContent="flex-end">
                                        <Grid item>
                                            <Button component={Link} to="/login" color="inherit">
                                                <Typography variant="caption">Login</Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button component={Link} to="/register" color="inherit">
                                                <Typography variant="caption">Register</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                                        <Grid item>
                                            <Button component={Link} to={`/users/${currentUser._id}`} color="inherit">
                                                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                                        <AccountCircleRoundedIcon />
                                                    </Avatar>
                                                    <Typography variant="caption">{currentUser.name}</Typography>
                                                </Box>
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={onClickLogout} color="inherit">
                                                <Typography variant="caption">Logout</Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
                {children}
            </Container>
            <Container component="footer">
                <Typography variant="body2" align="center">
                    <Link to="https://t.me/pavelihno" target="_blank">
                        {`Copyright © Opinionator ${new Date().getFullYear()}.`}
                    </Link>
                </Typography>
            </Container>
        </ThemeProvider>
    );
};

export default Base;
