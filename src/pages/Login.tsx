// Login page component
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { Mail, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
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
      await login({ email, password });
      navigate('/');
    } catch (err) {
      // Firebase error handling
      const errorMessage = err instanceof Error ? err.message : 'Invalid credentials';
      if (errorMessage.includes('auth/invalid-credential')) {
        setError('Email o contraseña incorrectos');
      } else if (errorMessage.includes('auth/user-not-found')) {
        setError('No existe una cuenta con este email');
      } else if (errorMessage.includes('auth/wrong-password')) {
        setError('Contraseña incorrecta');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Welcome Back!" subtitle="Sign in to continue your learning journey.">
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
    </AuthLayout>
  );
}
