import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from '@mui/material';

export default function QueueDisplay() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQueue();
    const channel = supabase
      .channel('karaoke_updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'karaoke_queue' }, () => fetchQueue())
      .subscribe();

    return () => supabase.removeChannel(channel);
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

  const nowPlaying = queue.find((item) => item.is_playing);
  const waiting = queue.filter((item) => !item.is_playing);

  return (
    <Box sx={{ mt: 4 }}>
      {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mb: 2 }} />}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ p: 3, borderRadius: '16px', backgroundColor: '#fce6c2', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>🖊 Agora cantando:</Typography>
        {nowPlaying ? (
          <Typography>
            <strong>{nowPlaying.singer}</strong> está cantando <em>{nowPlaying.music}</em> — {nowPlaying.artist}
          </Typography>
        ) : (
          <Typography>Ninguém está cantando no momento.</Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, borderRadius: '16px', backgroundColor: '#fff8e1' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>🎶 Próximas músicas:</Typography>
        <List>
          {waiting.map((item, index) => (
            <ListItem key={item.id} sx={{ borderBottom: '1px dashed #d2b48c' }}>
              <Box sx={{ mr: 2, color: '#c0392b', fontWeight: 'bold' }}>#{index + 1}</Box>
              <ListItemText
                primary={<strong>{item.singer} – {item.music}</strong>}
                secondary={<em>{item.artist}</em>}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
