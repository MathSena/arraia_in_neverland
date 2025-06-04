// src/components/Layout.jsx
import React from 'react';
import { Container, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/image.png")',
        backgroundRepeat: 'repeat',
        backgroundSize: '40% auto',
        backgroundPosition: 'top center',
        backgroundColor: '##E9791A',
        pt: { xs: 8, sm: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}