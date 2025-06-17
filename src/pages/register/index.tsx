import React, { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import { registerWithEmail } from '@/utils/authService';
import Input from '@/components/input/CustomInput';
import Button from '@/components/button/AuthButton';
import { auth } from '@/utils/firebase';
import { setLoading } from '@/store/slices/loading.slice';
import { useAppDispatch } from '@/hooks';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    repassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    repassword: '',
  });

  // Handle form input change with inline validation
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
      case 'repassword':
        if (!value.trim()) {
          setFormErrors((prev) => ({ ...prev, repassword: 'Please confirm password.' }));
        } else if (value !== formData.password) {
          setFormErrors((prev) => ({ ...prev, repassword: 'Passwords do not match.' }));
        } else {
          setFormErrors((prev) => ({ ...prev, repassword: '' }));
        }
        break;
    }
  };

  // Form submit handler with Firebase registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error messages
    setFormErrors({ email: '', password: '', repassword: '' });

    let hasError = false;

    if (!formData.email.trim()) {
      setFormErrors((prev) => ({ ...prev, email: 'Email is required.' }));
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      hasError = true;
    }

    if (!formData.password.trim()) {
      setFormErrors((prev) => ({ ...prev, password: 'Password is required.' }));
      hasError = true;
    } else if (formData.password.length < 6) {
      setFormErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters.' }));
      hasError = true;
    }

    if (!formData.repassword.trim()) {
      setFormErrors((prev) => ({ ...prev, repassword: 'Please confirm your password.' }));
      hasError = true;
    } else if (formData.password !== formData.repassword) {
      setFormErrors((prev) => ({ ...prev, repassword: 'Passwords do not match.' }));
      hasError = true;
    }

    if (hasError) return;

    try {
      dispatch(setLoading(true));
      await registerWithEmail(formData.email, formData.password);
      await signOut(auth); // Enforce re-authentication on login
      toast.success('Registration successful!', {
        description: 'You can now log in.',
      });
      navigate('/login');
    } catch (err: any) {
      console.error(err.message || 'Registration failed.');
      const code = err.code;

      if (code === 'auth/email-already-in-use') {
        toast.error('Email already in use', {
          description: 'Please use a different email.',
        });
      } else {
        toast.error('Registration failed', {
          description: err.message || 'Something went wrong.',
        });
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-6 rounded-lg shadow-md w-full max-w-md">
        <img src="/images/logo.png" className="w-full h-30 object-cover p-4 mb-8" alt="Logo" />
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
            placeholder="Create a password"
            className="w-full h-[50px]"
            error={formErrors.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="repassword"
            placeholder="Confirm your password"
            className="w-full h-[50px]"
            error={formErrors.repassword}
            onChange={handleChange}
          />
          <Button type="submit" label="Sign Up" className="w-full h-[50px]" />
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
