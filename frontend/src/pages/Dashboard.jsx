import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTransaction from '../components/AddTransaction';
import axios from 'axios';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userName = localStorage.getItem('name');

    const fetchTransactions = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get('http://localhost:5000/api/transactions', config);
    setTransactions(data);
    setLoading(false);
  } catch (error) {
    console.error('Failed to fetch bounties', error);
    localStorage.removeItem('token');
    navigate('/login');
  }
};

const handleResolve = async (transactionId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.put(`http://localhost:5000/api/transactions/${transactionId}`, {}, config);
      
      fetchTransactions();
    } catch (error) {
      console.error('Failed to resolve bounty', error);
    }
  };

  useEffect(() => {
  

    fetchTransactions();
  }, [navigate]);

  
  let totalIncoming = 0;
  let totalOutgoing = 0;
  
  const pendingTransactions = transactions.filter(t => t.status === 'pending');

  pendingTransactions.forEach(t => {
    if (t.type === 'gave') totalIncoming += t.amount;
    if (t.type === 'took') totalOutgoing += t.amount;
  });

  const friendBalances = {};
  pendingTransactions.forEach(t => {
    if (!friendBalances[t.friendName]) friendBalances[t.friendName] = 0;
    
    if (t.type === 'gave') friendBalances[t.friendName] += t.amount; 
    if (t.type === 'took') friendBalances[t.friendName] -= t.amount; 
  });

  const incomingList = pendingTransactions.filter(t => t.type === 'gave');
  const outgoingList = pendingTransactions.filter(t => t.type === 'took');

  if (loading) return <h3 className="text-center text-neon-green mt-5">ACCESSING_MAINFRAME...</h3>;

  return (
    <div className="container pb-5">
      <div className="card bounty-card p-4 mb-4">
        <h4 className="text-muted mb-4">WELCOME_BACK, <span className="text-white">{userName}</span></h4>
        
        <div className="row text-center">
          <div className="col-md-6 border-end border-secondary mb-3 mb-md-0">
            <h6 className="text-muted">TOTAL_BOUNTY_TO_COLLECT</h6>
            <h2 className="text-neon-green">Rs. {totalIncoming}</h2>
          </div>
          <div className="col-md-6">
            <h6 className="text-muted">TOTAL_DEBT_TO_CLEAR</h6>
            <h2 className="text-neon-red">Rs. {totalOutgoing}</h2>
          </div>
        </div>
      </div>

      <AddTransaction onAddSuccess={fetchTransactions} />

      <div className="card bounty-card p-4 mb-4">
        <h4 className="text-neon-green mb-3 border-bottom border-secondary pb-2">TARGET_BALANCES</h4>
        <div className="row">
          {Object.keys(friendBalances).length === 0 ? (
            <p className="text-muted">No active targets. The slate is clean.</p>
          ) : (
            Object.keys(friendBalances).map(friend => {
              const balance = friendBalances[friend];
              if (balance === 0) return null; 

              return (
                <div className="col-md-4 col-sm-6 mb-3" key={friend}>
                  <div className="bounty-panel d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-white text-uppercase">{friend}</span>
                    {balance > 0 ? (
                      <span className="text-neon-green fw-bold">+{balance}</span>
                    ) : (
                      <span className="text-neon-red fw-bold">{balance}</span> // Negative sign renders automatically
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card bounty-card p-4 h-100">
            <h5 className="text-neon-red mb-3">OUTGOING_DEBTS</h5>
            <div className="bounty-panel">
              {outgoingList.length === 0 ? <span className="text-muted text-white">No debts.</span> : 
                outgoingList.map(t => (
                  <div key={t._id} className="bounty-item d-flex justify-content-between">
                    <div>
                      <span className="fw-bold text-white">{t.friendName}</span>
                      <small className="d-block text-muted">{t.purpose}</small>
                    </div>
                    <span className="text-neon-red">-{t.amount}</span>
                    <button onClick={() => handleResolve(t._id)} className="btn btn-bounty-red py-0 px-2" style={{fontSize: '0.7rem'}}>SETTLE_DEBT</button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card bounty-card p-4 h-100">
            <h5 className="text-neon-green mb-3">INCOMING_CREDITS</h5>
            <div className="bounty-panel">
              {incomingList.length === 0 ? <span className="text-muted text-white">No credits.</span> : 
                incomingList.map(t => (
                  <div key={t._id} className="bounty-item d-flex justify-content-between">
                    <div>
                      <span className="fw-bold text-white">{t.friendName}</span>
                      <small className="d-block text-muted">{t.purpose}</small>
                    </div>
                    <span className="text-neon-green">+{t.amount}</span>
                    <button onClick={() => handleResolve(t._id)} className="btn btn-bounty py-0 px-2" style={{fontSize: '0.7rem'}}>COLLECT_FUNDS</button>
                    
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;