import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

import Input from '@/components/input/CustomInput';
import Button from '@/components/button/AuthButton';
import { loginWithEmail, loginWithGoogle } from '@/utils/authService';
import { useAppDispatch } from '@/hooks';
import { setLoading } from '@/store/slices/loading.slice';

/**
 * LoginPage - Handles email/password and Google login.
 * Validates form inputs, displays errors, and shows loading/toast feedback.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  // Handle input field changes and live validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    switch (name) {
      case 'email':
        if (!value.trim()) {
          setFormErrors((prev) => ({ ...prev, email: 'Email is required.' }));
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFormErrors((prev) => ({ ...prev, email: 'Enter a valid email.' }));
        } else {
          setFormErrors((prev) => ({ ...prev, email: '' }));
        }
        break;

      case 'password':
        if (!value.trim()) {
          setFormErrors((prev) => ({ ...prev, password: 'Password is required.' }));
        } else if (value.length < 6) {
          setFormErrors((prev) => ({ ...prev, password: 'At least 6 characters.' }));
        } else {
          setFormErrors((prev) => ({ ...prev, password: '' }));
        }
        break;
    }
  };

  // Submit form with validation and login logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const errors = { email: '', password: '' };

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
      hasError = true;
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
      hasError = true;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
      hasError = true;
    }

    setFormErrors(errors);
    if (hasError) return;

    try {
      dispatch(setLoading(true));
      await loginWithEmail(formData.email, formData.password);
      toast.success('Logged in successfully!');
    } catch (err: any) {
      const code = err.code;
      console.error(code || 'Login failed.');
      if (code === 'auth/invalid-credential') {
        toast.error('Invalid credentials', { description: 'User not found or invalid credentials.' });
      } else if (code === 'auth/too-many-requests') {
        toast.error('Too many attempts', { description: 'Please try again later.' });
      } else if (code === 'auth/user-disabled') {
        toast.error('Account Disabled', {
          description: 'Your account has been disabled. Please contact support.',
        });
      } else {
        toast.error('Login failed', { description: err.message || 'Unknown error.' });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle Google OAuth sign-in
  const googleAuthHandler = async () => {
    try {
      dispatch(setLoading(true));
      await loginWithGoogle();
      toast.success('Logged in successfully!');
    } catch (err: any) {
      console.error('Google login failed:', err.message);
      toast.error('Login failed', { description: err.message || 'Unknown error.' });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 rounded-lg shadow-md w-full max-w-md">
        {/* Logo */}
        <img src="/images/logo.png" className="w-full h-30 object-cover p-4 mb-8" alt="App Logo" />

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="email"
            placeholder="you@example.com"
            className="w-full h-[50px]"
            error={formErrors.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full h-[50px]"
            error={formErrors.password}
            onChange={handleChange}
          />
          <Button type="submit" label="Sign In" className="w-full h-[50px]" />
        </form>

        {/* Google Auth Button */}
        <div className="my-4">
          <Button
            label="Sign in with Google"
            className="w-full h-[50px]"
            img="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            onClick={googleAuthHandler}
          />
        </div>

        {/* Sign Up Redirect */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;