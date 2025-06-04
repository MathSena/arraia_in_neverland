import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  InputAdornment,
  Typography
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { supabase } from '../supabaseClient';

export default function AddToQueueForm() {
  const [form, setForm] = useState({ singer: '', artist: '', music: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('karaoke_queue').insert([{ ...form, is_playing: false, status: 'waiting', position: 0 }]);
    setForm({ singer: '', artist: '', music: '' });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', backgroundColor: '#fce6c2' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>🎤 Inscreva sua música:</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              placeholder="Ex: João Silva"
              label="Quem vai cantar"
              name="singer"
              value={form.singer}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px', backgroundColor: '#fff' }
              }}
            />
            <TextField
              placeholder="Ex: The Beatles"
              label="Artista original"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MusicNoteIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px', backgroundColor: '#fff' }
              }}
            />
            <TextField
              placeholder="Ex: Hey Jude"
              label="Nome da música"
              name="music"
              value={form.music}
              onChange={handleChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LibraryMusicIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: '12px', backgroundColor: '#fff' }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#e17c2b',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#fff',
                '&:hover': { backgroundColor: '#d1671c' }
              }}
            >
              ➕ Adicionar à fila
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}