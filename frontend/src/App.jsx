import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">BroBroke</h1>
        <Routes>
          
          <Route path="/" element={<h3 className="text-center">Dashboard coming soon...</h3>} />
          <Route path="/login" element={<h3 className="text-center">Login coming soon...</h3>} />
          <Route path="/register" element={<h3 className="text-center">Register coming soon...</h3>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;