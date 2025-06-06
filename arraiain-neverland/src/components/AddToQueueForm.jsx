import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  InputAdornment,
  Typography,
  Snackbar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { supabase } from '../supabaseClient';

export default function AddToQueueForm() {
  const [form, setForm] = useState({ singer: '', artist: '', music: '' });
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.singer || !form.artist || !form.music) return;
    setLoading(true);
    const { error } = await supabase
      .from('karaoke_queue')
      .insert([{ ...form, is_playing: false, status: 'waiting', position: 0 }]);
    setLoading(false);
    if (!error) {
      setSnackOpen(true);
      setForm({ singer: '', artist: '', music: '' });
    }
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
              disabled={!form.singer || !form.artist || !form.music || loading}
              sx={{
                backgroundColor: '#e17c2b',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1rem',
                color: '#fff',
                '&:hover': { backgroundColor: '#d1671c' }
              }}
            >
              {loading ? 'Adicionando...' : '➕ Adicionar à fila'}
            </Button>
            <Snackbar
              open={snackOpen}
              autoHideDuration={3000}
              onClose={() => setSnackOpen(false)}
              message="Música adicionada!"
            />
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}