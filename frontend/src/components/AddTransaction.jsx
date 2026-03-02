import { useState } from 'react';
import axios from 'axios';

const AddTransaction = ({ onAddSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [type, setType] = useState('gave'); 
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const token = localStorage.getItem('token');
    
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/transactions`,
        { friendName, type, amount: Number(amount), purpose },
        config
      );

      setFriendName('');
      setAmount('');
      setPurpose('');
      setIsOpen(false);
      
      onAddSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to transmit data.');
    }
  };

  return (
    <div className="mb-4">
      <button 
        className="btn btn-bounty w-100 mb-3" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '[-] CLOSE_UPLINK' : '[+] ADD_NEW_RECORD'}
      </button>

      {isOpen && (
        <div className="card bounty-card p-4 border-top-0">
          <h5 className="text-neon-green mb-3">TRANSMIT_NEW_ENTRY</h5>
          {error && <div className="alert alert-danger rounded-0">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="text-muted small">TARGET_ALIAS (NAME)</label>
                <input 
                  type="text" 
                  className="form-control form-control-bounty" 
                  placeholder="e.g. Ali"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  required 
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="text-muted small">FUNDS_AMOUNT</label>
                <input 
                  type="number" 
                  className="form-control form-control-bounty" 
                  placeholder="Rs. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="text-muted small">DIRECTION</label>
                <select 
                  className="form-select form-control-bounty" 
                  value={type} 
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="gave">I GAVE THEM MONEY (Owed to me)</option>
                  <option value="took">I TOOK MONEY (I owe them)</option>
                </select>
              </div>
              <div className="col-md-6 mb-4">
                <label className="text-muted small">PURPOSE (OPTIONAL)</label>
                <input 
                  type="text" 
                  className="form-control form-control-bounty" 
                  placeholder="Late night shawarma"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-bounty w-100">
              EXECUTE_TRANSFER
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;