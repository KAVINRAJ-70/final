import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useEffect } from 'react';

import ProjectDetails from './pages/ProjectDetails';
import About from './pages/About';

function App() {
  // Smooth scroll behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                localStorage.getItem('adminToken') ? <Admin /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
