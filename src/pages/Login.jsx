import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('elena@globetrotter.io');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setInfoMessage(`Password reset link sent to ${email || 'your email'}.`);
    setTimeout(() => setInfoMessage(''), 4000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative bg-[#fcfaf8]">
      <div className="absolute inset-0 bg-[#fdfbf7]/60 backdrop-blur-[1px]"></div>
      
      <div className="relative w-full max-w-[460px] bg-white rounded-3xl shadow-[var(--shadow-card)] p-8 md:p-10 mx-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center mb-8">
          <Link to="/dashboard" className="text-3xl font-bold text-[var(--primary)] mb-2 tracking-tight block">
            GlobeTrotter
          </Link>
          <p className="text-[var(--text-muted)] text-sm">
            {isSignUp ? 'Create your adventure journal account.' : 'Welcome back to your travel journal.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 flex justify-between items-center border border-red-100 animate-in fade-in duration-150">
            <span>{error}</span>
            <button type="button" onClick={() => setError('')} className="underline font-semibold hover:text-red-800">Dismiss</button>
          </div>
        )}

        {infoMessage && (
          <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm mb-6 flex justify-between items-center border border-green-100 animate-in fade-in duration-150">
            <span>{infoMessage}</span>
            <button type="button" onClick={() => setInfoMessage('')} className="underline font-semibold hover:text-green-800">✕</button>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-1">
          {isSignUp && (
            <Input 
              label="Full Name"
              id="name"
              type="text"
              placeholder="Elena Ivanova"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}

          <Input 
            label="Email Address"
            id="email"
            type="email"
            placeholder="explorer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelRight={
              !isSignUp ? (
                <button 
                  type="button" 
                  onClick={handleForgotPassword} 
                  className="text-[var(--primary)] font-bold text-xs hover:underline"
                >
                  Forgot password?
                </button>
              ) : null
            }
            rightElement={
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[var(--primary)] focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                    <line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            }
          />

          <Button type="submit" fullWidth className="mt-4 text-[15px]" disabled={isLoading}>
            {isLoading ? (isSignUp ? 'Creating Account...' : 'Logging in...') : (isSignUp ? 'Create Account' : 'Log In')}
          </Button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">OR</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <div className="text-center text-sm text-[var(--text-muted)]">
          {isSignUp ? (
            <>
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(false); setError(''); }} 
                className="text-[var(--primary)] font-bold hover:underline ml-1"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(true); setError(''); }} 
                className="text-[var(--primary)] font-bold hover:underline ml-1"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
