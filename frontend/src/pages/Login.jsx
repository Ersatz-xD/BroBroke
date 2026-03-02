import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Bounty lost.');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card bounty-card p-4">
          <h2 className="text-center text-neon-green mb-4">SYSTEM_LOGIN</h2>
          
          {error && <div className="alert alert-danger rounded-0 border-0">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label text-muted">IDENTIFIER (EMAIL)</label>
              <input
                type="email"
                className="form-control form-control-bounty"
                placeholder="cowboy@space.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted">ACCESS_CODE (PASSWORD)</label>
              <input
                type="password"
                className="form-control form-control-bounty"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-bounty w-100">
              INITIALIZE
            </button>
          </form>
          
          <div className="text-center mt-4">
            <span className="text-muted">No bounty hunter license? </span>
            <Link to="/register" className="text-neon-green text-decoration-none">Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;