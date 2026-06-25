import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { AnimeDataProvider } from './context/AnimeDataContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile/Profile';
import AnimeDetail from './pages/AnimeDetail/AnimeDetail';

function App() {
  return (
    <AnimeDataProvider>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </AnimeDataProvider>
  );
}

export default App;
