import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { login } from '../../redux/actions';
import Base from '../Base';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({});
        dispatch(login(formData))
            .unwrap()
            .then((res) => {
                return navigate('/');
            })
            
            .catch((res) => {
                console.log(res);
                if (Array.isArray(res.error)) {
                    setErrors(res.error.reduce((map, { path, msg }) => {
                        map[path] = msg;
                        return map;
                    }, {}));
                } else {
                    setErrors({ message: res.error });
                }
                return;
            });
    };

    return (
        <Base>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography variant="h5">Sign in</Typography>
                    <Box component="form" onSubmit={onSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange={onChange}
                            error={errors.email ? true : false}
                            helperText={errors.email ? errors.email : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={onChange}
                            error={errors.password ? true : false}
                            helperText={errors.password ? errors.password : ''}
                        />
                        <Typography variant="caption" color="error">
                            {errors.message && errors.message}
                        </Typography>
                        <Button type="submit" fullWidth variant="contained" >
                            Login
                        </Button>
                        <Box>
                            <Link href="#" variant="body2">
                                Reset password
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Base>
    );
};

export default Login;