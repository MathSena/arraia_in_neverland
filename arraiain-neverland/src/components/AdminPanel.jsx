import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';

export default function AdminPanel() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('karaoke_queue').select('*').order('created_at');
    if (error) {
      setError('Erro ao carregar fila');
    } else {
      setQueue(data || []);
      setError('');
    }
    setLoading(false);
  };

  const handlePlay = async (id) => {
    await supabase.from('karaoke_queue').update({ is_playing: false }).neq('id', id);
    await supabase.from('karaoke_queue').update({ is_playing: true }).eq('id', id);
    fetchQueue();
  };

  const handleRemove = async (id) => {
    await supabase.from('karaoke_queue').delete().eq('id', id);
    fetchQueue();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Rock Salt", cursive',
          color: '#FFD93D',
          textAlign: 'center',
          mb: 4,
          textShadow: '1px 1px 2px #000',
        }}
      >
        Painel de Controle 👨‍🎤
      </Typography>

      <Stack spacing={3}>
        {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
        {error && <Alert severity="error">{error}</Alert>}
        {queue.map((item) => (
          <Card
            key={item.id}
            sx={{
              backgroundColor: item.is_playing ? 'rgba(255, 241, 118, 0.95)' : 'rgba(255,255,255,0.8)',
              border: item.is_playing ? '3px solid #FFD93D' : '1px solid #ccc',
              boxShadow: item.is_playing
                ? '0 0 15px 3px #FFD93D'
                : '0 2px 8px rgba(0,0,0,0.2)',
              borderRadius: 3,
              transition: '0.3s ease',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {item.singer}
              </Typography>
              <Typography variant="body2" sx={{ color: '#444' }}>
                {item.artist} – {item.music}
              </Typography>
              {item.is_playing && (
                <Chip
                  label="Tocando agora"
                  color="warning"
                  size="small"
                  sx={{ mt: 1 }}
                />
              )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handlePlay(item.id)}
                disabled={item.is_playing}
              >
                ▶️ Tocar
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => handleRemove(item.id)}
              >
                ❌ Remover
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}