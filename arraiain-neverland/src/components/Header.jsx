import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        backgroundColor: '#E9791A',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        px: { xs: 2, sm: 6 },
        py: { xs: 6, sm: 8 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <Box sx={{ color: '#fff', textShadow: '1px 1px 2px #000', textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{
            fontFamily: '"Rock Salt", cursive',
            color: '#FFD93D',
            fontWeight: 700,
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          ARRAIÁ IN <br /> NEVERLAND
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h6'}
          sx={{ fontStyle: 'italic', fontWeight: 300, color: '#fffde7' }}
        >
          Onde o pop punk encontra o milho assado 🎸🌽
        </Typography>
      </Box>

      <Box
        component="img"
        src="/header.png"
        alt="Logo personagem"
        sx={{
          mt: { xs: 4, sm: 0 },
          height: { xs: 100, sm: 160 },
          width: 'auto',
          borderRadius: '16px',
          objectFit: 'cover',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      />
    </Box>
  );
}