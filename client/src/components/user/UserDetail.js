import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';

import Base from '../Base';
import { baseUrl } from '../../api';
import { changeName, changePassword, uploadAvatar } from '../../redux/actions/user';
import { displayErrors, fullWidthStyle } from '../../redux/utils';


const avatarStyle = { width: '8rem', height: '8rem', border: '0.1px solid lightgray' };

const UserDetail = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.currentUser);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarPath, _setAvatarPath] = useState('');
    const setAvatarPath = (fileName) => { _setAvatarPath(`${baseUrl}/${fileName}`) };
    const [errors, setErrors] = useState({});
    const [changeNameSuccess, setChangeNameSuccess] = useState(false);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            if (user.avatarPath) {
                setAvatarPath(user.avatarPath);
            }
        }
    }, [user]);

    const onAvatarFileChange = async e => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file))
            .unwrap()
            .then((res) => { setAvatarPath(res); })
            .catch((res) => { });
    };

    const MemoizedAvatar = memo(({ avatarPath, onAvatarClick }) => (
        <Avatar src={avatarPath} style={avatarStyle} onClick={onAvatarClick} />
    ));

    const onAvatarClick = () => {
        document.getElementById('avatarFile').click();
    };

    const onPasswordSubmit = async e => {
        e.preventDefault();
        setErrors({});
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords must match' });
            return;
        }
        dispatch(changePassword(password))
            .unwrap()
            .then(res => {
                setPassword('');
                setConfirmPassword('');
                setChangePasswordSuccess(true);
            })
            .catch(res => displayErrors(res, setErrors));
    };

    const onNameSubmit = async e => {
        e.preventDefault();
        setErrors({});
        dispatch(changeName(name))
            .unwrap()
            .then(res => {
                setChangeNameSuccess(true);
            })
            .catch(res => {console.log(res); displayErrors(res, setErrors)} );
    };

    const onNameChange = e => {
        setName(e.target.value);
    };

    const onPasswordChange = e => {
        setPassword(e.target.value);
    };

    const onConfirmPasswordChange = e => {
        setConfirmPassword(e.target.value);
    };


    return (
        <Base>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={2} style={{ padding: '2rem' }}>
                    <Typography component="h1" variant="h5" align="center" sx={{ textDecoration: 'underline', mb: '1rem' }}>
                        Profile
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item style={fullWidthStyle} align="center">
                            <MemoizedAvatar avatarPath={avatarPath} onAvatarClick={onAvatarClick} />
                            <input
                                id="avatarFile"
                                type="file"
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={onAvatarFileChange}
                            />
                            <Button variant="contained" color="primary" onClick={onAvatarClick} style={{ display: 'none' }}>Upload Avatar</Button>
                        </Grid>
                        <Grid item style={fullWidthStyle}>
                            <Box component="form" onSubmit={onNameSubmit}>
                                <Grid container style={fullWidthStyle} spacing={1}>
                                    <Grid item style={fullWidthStyle}>
                                        <TextField
                                            required
                                            margin="dense"
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            value={name}
                                            onChange={onNameChange}
                                            error={errors.name ? true : false}
                                            helperText={errors.name ? errors.name : ''}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained">Change name</Button>
                                    </Grid>
                                    {changeNameSuccess && <Grid item style={fullWidthStyle}><Alert>Name changed successfully!</Alert></Grid>}
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item style={fullWidthStyle}>
                            <Box component="form" onSubmit={onPasswordSubmit}>
                                <Grid container style={fullWidthStyle} spacing={1}>
                                    <Grid item style={fullWidthStyle}>
                                        <TextField
                                            required
                                            margin="dense"
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={onPasswordChange}
                                            error={errors.password ? true : false}
                                            helperText={errors.password ? errors.password : ''}
                                        />
                                    </Grid>
                                    <Grid item style={fullWidthStyle}>
                                        <TextField
                                            required
                                            margin="dense"
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={onConfirmPasswordChange}
                                            error={errors.confirmPassword ? true : false}
                                            helperText={errors.confirmPassword ? errors.confirmPassword : ''}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button type="submit" variant="contained" >Change password</Button>
                                    </Grid>
                                    {changePasswordSuccess && <Grid item style={fullWidthStyle}><Alert>Password changed successfully!</Alert></Grid>}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Base>
    );
};

export default UserDetail;