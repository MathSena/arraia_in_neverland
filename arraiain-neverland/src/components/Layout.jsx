import React from 'react';
import { Container, Box } from '@mui/material';

export default function Layout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#8C4924',
        py: 4,
      }}
    >
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}
