// Shared Auth Layout Component
import { type ReactNode } from 'react';
import { Lightbulb, Pencil, FileText, Heart, CheckSquare, Sparkle } from 'lucide-react';
import '../styles/pages/Auth.css';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
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

          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
