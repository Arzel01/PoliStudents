import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context';
import { Home, Login, Register, Upload, ActiveStudy, Pricing } from './pages';
import SessionConfig from './pages/SessionConfig';
import GeneratingPlan from './pages/GeneratingPlan';
import StudyPlan from './pages/StudyPlan';
import Calendar from './pages/Calendar';
import Streak from './pages/Streak';
import Quiz from './pages/Quiz';
import AIChatbot from './components/AIChatbot';
import './App.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/session-config" element={<SessionConfig />} />
      <Route path="/generating" element={<GeneratingPlan />} />
      <Route path="/plan/:id" element={<StudyPlan />} />
      <Route path="/study/:lessonId" element={<ActiveStudy />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/streak" element={<Streak />} />
      <Route path="/quiz/:lessonId" element={<Quiz />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/ai-assistant" element={<AIChatbot />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
