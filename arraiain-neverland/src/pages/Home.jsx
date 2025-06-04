import React from 'react';
import Header from '../components/Header';
import AddToQueueForm from '../components/AddToQueueForm';
import QueueDisplay from '../components/QueueDisplay';

export default function Home() {
  return (
    <>
      <Header />
      <AddToQueueForm />
      <QueueDisplay />
    </>
  );
}
