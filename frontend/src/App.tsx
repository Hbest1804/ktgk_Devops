/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Player from './pages/Player';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import About from './pages/About';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !location.pathname.startsWith('/watch');

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch/:id" element={<Player />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
