import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddToQueueForm from './components/AddToQueueForm';
import QueueDisplay from './components/QueueDisplay';
import AdminPanel from './components/AdminPanel';
import Layout from './components/Layout';

function Home() {
  return (
    <Layout>
      <Header />
      <AddToQueueForm />
      <QueueDisplay />
    </Layout>
  );
}

function Admin() {
  return (
    <Layout>
      <Header />
      <AdminPanel />
    </Layout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}