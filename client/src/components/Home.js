import React from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import Base from './Base';
import { api } from '../api';


const Home = () => {
    return (
        <Base>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
            </Container>
        </Base>
    );
};


export default Home;