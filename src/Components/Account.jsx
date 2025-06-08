import React, { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebase';
import emailjs from '@emailjs/browser';

const Account = () => {
  // Common states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  
  // Signup form states
  const [signupData, setSignupData] = useState({
    name: '',
    password: '',
    confirmPassword: ''
  });

  // Login form states
  const [loginData, setLoginData] = useState({
    password: ''
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('NP2ZErhB-YRWGY114');
  }, []);

  // OTP timer countdown
  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtpEmail = async (email, otp) => {
    try {
      const templateParams = {
        to_email: email,
        otp: otp
      };

      await emailjs.send(
        'service_9r4j8p9',
        'template_gbd5llk',
        templateParams
      );
      
      return true;
    } catch (err) {
      console.error('Failed to send OTP:', err);
      return false;
    }
  };

  const handleSendOtp = async () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const otp = generateOtp();
      const sent = await sendOtpEmail(email, otp);
      
      if (sent) {
        setGeneratedOtp(otp);
        setOtpSent(true);
        setOtpTimer(300); // 5 minutes timer
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    if (otp === generatedOtp) {
      setOtpVerified(true);
      setError('');
      setOtpTimer(0);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    if (!otpVerified) {
      setError('Please verify your OTP first');
      setLoading(false);
      return;
    }

    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, signupData.password);
      alert('Account created successfully!');
      resetForm();
    } catch (err) {
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!otpVerified) {
      setError('Please verify your OTP first');
      return;
    }

    if (!loginData.password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, loginData.password);
      alert('Logged in successfully!');
      resetForm();
    } catch (err) {
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/user-not-found':
          setError('User not found. Please sign up first.');
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid password. Please try again.');
          break;
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setOtp('');
    setOtpSent(false);
    setOtpVerified(false);
    setGeneratedOtp('');
    setError('');
    setSignupData({
      name: '',
      password: '',
      confirmPassword: ''
    });
    setLoginData({
      password: ''
    });
  };

  return (
<div className="account_Container flex flex-col justify-center items-center gap-6 md:gap-10 pt-6 md:pt-10 px-4">
  <span className='text-2xl md:text-4xl'>{isSignUp ? 'Create Account' : 'Welcome'}</span>
  
  {error && <div className="text-red-500 text-sm md:text-base text-center">{error}</div>}
  
  {isSignUp ? (
    // Signup Form with OTP
    <form className="form_Container w-full md:w-3/4 lg:w-1/2 p-4 flex flex-col justify-center items-center gap-3 md:gap-4" onSubmit={handleSignupSubmit}>
      <input 
        type="text" 
        name="name"
        className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 mb-1 md:mb-2 text-sm md:text-base'
        placeholder='Full Name'
        value={signupData.name}
        onChange={handleSignupChange}
        required
      />
      <input 
        type="email" 
        className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 mb-1 md:mb-2 text-sm md:text-base'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={otpSent}
      />
      <div className="otp w-full md:w-3/4 lg:w-1/2 gap-2 flex mb-1 md:mb-2 flex-col sm:flex-row">
        <input 
          type="number" 
          className='border-2 rounded-4xl border-gray-300 w-full sm:w-1/2 p-2 text-sm md:text-base' 
          placeholder='Enter OTP' 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpSent || otpVerified}
        />
        {otpSent ? (
          otpVerified ? (
            <button 
              type="button"
              className='bg-green-500 border-2 border-green-500 text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
              disabled
            >
              Verified
            </button>
          ) : (
            <button 
              type="button"
              onClick={handleVerifyOtp}
              className='bg-black border-2 border-black text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
              disabled={loading}
            >
              Verify OTP
            </button>
          )
        ) : (
          <button 
            type="button"
            onClick={handleSendOtp}
            className='bg-black border-2 border-black text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
            disabled={loading || !email}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        )}
      </div>
      {otpTimer > 0 && !otpVerified && (
        <div className="text-xs md:text-sm text-gray-500">
          OTP expires in: {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
        </div>
      )}
      <input 
        type="password" 
        name="password"
        className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 mb-1 md:mb-2 text-sm md:text-base'
        placeholder='Password (min 6 characters)'
        value={signupData.password}
        onChange={handleSignupChange}
        required
        minLength="6"
      />
      <input 
        type="password" 
        name="confirmPassword"
        className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 mb-1 md:mb-2 text-sm md:text-base'
        placeholder='Confirm Password'
        value={signupData.confirmPassword}
        onChange={handleSignupChange}
        required
        minLength="6"
      />
      <button 
        type="submit"
        className='bg-black border-2 border-black text-white w-full md:w-3/4 lg:w-1/2 p-2 rounded-4xl mt-1 md:mt-2 text-sm md:text-base'
        disabled={loading || !otpVerified}
      >
        {loading ? 'Creating Account...' : 'Complete Sign Up'}
      </button>
      <span className="text-sm md:text-base">Already have an account? 
        <button 
          type="button"
          onClick={() => {
            setIsSignUp(false);
            resetForm();
          }} 
          className='text-blue-600 ml-1'
        >
          Login
        </button>
      </span>
    </form>
  ) : (
    // Login Form with OTP
    <div className="form_Container w-full md:w-3/4 lg:w-1/2 p-4 flex flex-col justify-center items-center gap-3 md:gap-4">
      <input 
        type="email" 
        className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 text-sm md:text-base' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter Email'
        disabled={otpSent}
      />
      <div className="otp w-full md:w-3/4 lg:w-1/2 gap-2 flex flex-col sm:flex-row">
        <input 
          type="number" 
          className='border-2 rounded-4xl border-gray-300 w-full sm:w-1/2 p-2 text-sm md:text-base' 
          placeholder='Enter OTP' 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={!otpSent || otpVerified}
        />
        {otpSent ? (
          otpVerified ? (
            <button 
              className='bg-green-500 border-2 border-green-500 text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
              disabled
            >
              Verified
            </button>
          ) : (
            <button 
              onClick={handleVerifyOtp}
              className='bg-black border-2 border-black text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
              disabled={loading}
            >
              Verify OTP
            </button>
          )
        ) : (
          <button 
            onClick={handleSendOtp}
            className='bg-black border-2 border-black text-white w-full sm:w-1/2 p-2 rounded-4xl text-sm md:text-base'
            disabled={loading || !email}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        )}
      </div>
      {otpTimer > 0 && !otpVerified && (
        <div className="text-xs md:text-sm text-gray-500">
          OTP expires in: {Math.floor(otpTimer / 60)}:{String(otpTimer % 60).padStart(2, '0')}
        </div>
      )}
      {otpVerified && (
        <input 
          type="password" 
          name="password"
          className='border-2 rounded-4xl border-gray-300 w-full md:w-3/4 lg:w-1/2 p-2 text-sm md:text-base' 
          placeholder='Enter Password'
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
      )}
      <button 
        onClick={handleLogin}
        className='bg-black border-2 border-black text-white w-full md:w-3/4 lg:w-1/2 p-2 rounded-4xl text-sm md:text-base'
        disabled={loading || !otpVerified}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <span className="text-sm md:text-base">Don't have an account? 
        <button 
          onClick={() => {
            setIsSignUp(true);
            resetForm();
          }} 
          className='text-blue-600 ml-1'
        >
          Sign Up
        </button>
      </span>
    </div>
  )}
</div>
  )
}

export default Account;