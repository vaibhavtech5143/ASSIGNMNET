
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import OverlayForm from './pages/OverlayForm';
import { Rtsp } from './pages/Rtsp';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Specify the element for the root route */}
          <Route path="/overlay" element={<OverlayForm />} /> {/* Specify the element for the root route */}
          <Route path="/rtsp" element={<Rtsp />} /> {/* Specify the element for the root route */}
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
