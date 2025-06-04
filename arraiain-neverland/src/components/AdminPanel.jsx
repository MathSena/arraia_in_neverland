import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button, Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';

export default function AdminPanel() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    const { data } = await supabase.from('karaoke_queue').select('*').order('created_at');
    setQueue(data || []);
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
      <Typography variant="h5" gutterBottom>Painel de Controle 👨‍🎤</Typography>
      <List>
        {queue.map((item) => (
          <ListItem key={item.id} secondaryAction={
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="outlined" onClick={() => handlePlay(item.id)}>▶️ Tocar</Button>
              <Button size="small" color="error" variant="outlined" onClick={() => handleRemove(item.id)}>❌ Remover</Button>
            </Stack>
          }>
            <ListItemText primary={item.singer} secondary={`${item.artist} – ${item.music}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}