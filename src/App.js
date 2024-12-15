import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import OnBoarding from './pages/OnBoarding';
import Dashboard from './pages/Dashboard';
// Import your components/pages
import SignInForm from './pages/SignInForm';
import Evaluation from './pages/Evaluation';
import Quiz from './pages/Quiz';
import ViewQuiz from './pages/ViewQuiz';
import QuizResults from './pages/QuizResults';
import Support from './pages/Support';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import PricingSection from './pages/PricingSection';
import AdminLoginSection from './pages/AdminLogin';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminQuiz from './pages/Admin/Quiz';
import AdminUser from './pages/Admin/User';
import AdminEvaluation from './pages/Admin/Evaluation';
import AdminEvaluationquiz from './pages/Admin/Evaluationquiz';



function App()
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/evaluation/:id" element={<Evaluation />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizresults" element={<QuizResults />} />
          <Route path="/view-quiz/:id" element={<ViewQuiz />} />
          <Route path="/admin/view-quiz/:id" element={<AdminEvaluation />} />
          <Route path="/admin/viewquiz/:quizId/:userId" element={<AdminEvaluationquiz />} />

          <Route path="/support" element={<Support />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<PricingSection />} />
          <Route path="/admin/login" element={<AdminLoginSection />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/quiz" element={<AdminQuiz />} />
          <Route path="/admin/user" element={<AdminUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
