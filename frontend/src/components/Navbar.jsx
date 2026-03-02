import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('userName') || 'UNKNOWN_HUNTER';
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  if (!token || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar mb-4 p-3 bounty-card d-flex justify-content-between align-items-center">
      <Link to="/" className="text-neon-green text-decoration-none fs-4 fw-bold" style={{ letterSpacing: '3px' }}>
        BRO BROKE
      </Link>
      
      <div className="d-flex align-items-center">
        <span className="text-muted me-4 d-none d-md-block">ID: <span className="text-white">{userName}</span></span>
        <button className="btn btn-bounty-red px-3 py-1" onClick={handleLogout}>
           ABORT_SESSION 
        </button>
      </div>
    </nav>
  );
};

export default Navbar;