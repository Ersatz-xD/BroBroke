import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-6 col-lg-4">
        <div className="card bounty-card p-4">
          <h2 className="text-center text-neon-green mb-4">NEW_BOUNTY_HUNTER</h2>
          
          {error && <div className="alert alert-danger rounded-0 border-0">{error}</div>}
          
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label text-muted text-neon-green">ALIAS (NAME)</label>
              <input
                type="text"
                className="form-control form-control-bounty"
                placeholder="Spike Spiegel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted text-neon-green">CONTACT (EMAIL)</label>
              <input
                type="email"
                className="form-control form-control-bounty"
                placeholder="spike@bebop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label text-muted text-neon-green">SECURE_KEY (PASSWORD)</label>
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
              REGISTER
            </button>
          </form>
          
          <div className="text-center mt-4">
            <span className="text-muted text-neon-green">Already registered? </span>
            <Link to="/login" className="text-neon-green text-decoration-none">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;