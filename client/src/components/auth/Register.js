import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CreateIcon from '@mui/icons-material/Create';
import Typography from '@mui/material/Typography';

import { register } from '../../redux/actions/auth';
import Base from '../Base';


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({});
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords must match' });
            return;
        }
        dispatch(register(formData))
            .unwrap()
            .then((res) => {
                return navigate('/');
            })
            .catch((res) => {
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
                        <CreateIcon />
                    </Avatar>
                    <Typography variant="h5">Sign up</Typography>
                    <Box component="form" onSubmit={onSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Profile name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            error={errors.name ? true : false}
                            helperText={errors.name ? errors.name : ''}
                        />
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            error={errors.confirmPassword ? true : false}
                            helperText={errors.confirmPassword ? errors.confirmPassword : ''}
                        />
                        <Typography variant="caption" color="error">
                            {errors.message && errors.message}
                        </Typography>
                        <Button type="submit" fullWidth variant="contained" >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Base>
    );
};

export default Register;
