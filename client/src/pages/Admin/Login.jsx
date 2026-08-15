import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full rounded-[32px] shadow-extruded p-10 bg-neo-bg">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold font-display text-neo-fg">Admin Login</h2>
          <p className="text-neo-muted mt-3 font-medium">Sign in to manage your portfolio</p>
        </div>

        {error && <div className="mb-6 p-4 rounded-2xl shadow-inset text-red-500 font-bold text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-neo-fg flex items-center gap-2"><User size={16} className="text-neo-accent"/> Username</label>
            <input 
              type="text" required
              value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-neo-fg flex items-center gap-2"><Lock size={16} className="text-neo-accent"/> Password</label>
            <input 
              type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-neo-bg shadow-inset-deep text-neo-fg focus:outline-none focus:ring-2 focus:ring-neo-accent focus:ring-offset-2 focus:ring-offset-neo-bg transition-all"
            />
          </div>
          
          <button type="submit" className="w-full py-5 text-white font-bold bg-neo-accent rounded-2xl shadow-[5px_5px_10px_rgba(163,177,198,0.6),-5px_-5px_10px_rgba(255,255,255,0.5)] hover:-translate-y-[1px] hover:shadow-[7px_7px_15px_rgba(163,177,198,0.7),-7px_-7px_15px_rgba(255,255,255,0.6)] active:translate-y-[0.5px] active:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.2),inset_-5px_-5px_10px_rgba(255,255,255,0.1)] transition-all duration-300">
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neo-muted font-bold space-y-4">
          <div><Link to="/" className="hover:text-neo-accent transition-colors">← Back to Home</Link></div>
          {/* <div><Link to="/admin/register" className="hover:text-neo-accent transition-colors">Create an admin account</Link></div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
