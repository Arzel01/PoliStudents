// Login page component
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Lightbulb, Pencil, FileText, Heart, CheckSquare, Sparkle, Mail, Lock } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left brand panel - only visible on desktop */}
        <div className="auth-brand-panel">
          <span className="brand-icon"><Sparkle size={32} /></span>
          <span className="brand-name">PathWise</span>
          <p className="brand-tagline">
            Tu compañero de estudio potenciado por IA. Sube tus materiales y obtén rutas de aprendizaje personalizadas.
          </p>
        </div>

        <div className="auth-form-wrapper">
          {/* Decorative icons */}
          <div className="decorative-icons">
            <span className="icon icon-bulb"><Lightbulb size={20} /></span>
            <span className="icon icon-edit"><Pencil size={20} /></span>
            <span className="icon icon-note"><FileText size={20} /></span>
            <span className="icon icon-heart"><Heart size={20} /></span>
            <span className="icon icon-check"><CheckSquare size={20} /></span>
          </div>

          {/* Logo */}
          <div className="auth-logo">
            <div className="logo-icon"><Sparkle size={24} /></div>
          </div>

          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Sign in to continue your learning journey.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <span className="input-icon"><Mail size={18} /></span>
              <input
                type="text"
                placeholder="Email Address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon"><Lock size={18} /></span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button className="google-button">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="google-icon"
            />
            Login with Google
          </button>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
