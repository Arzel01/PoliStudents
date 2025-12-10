// Register page component
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Lightbulb, Pencil, FileText, Heart, CheckSquare, Sparkle, Mail, Lock, User } from 'lucide-react';
import '../styles/pages/Auth.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your learning journey with PathWise today.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <span className="input-icon"><Mail size={18} /></span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon"><User size={18} /></span>
              <input
                type="text"
                placeholder="Username"
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
                minLength={6}
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
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
            Register with Google
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
