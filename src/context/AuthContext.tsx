import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../utils/firebase';

interface AuthContextType {
  user: User | null;     // Firebase user object, or null if not authenticated
  loading: boolean;      // Whether the auth state is still loading
}

// Create authentication context with default values
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

/**
 * AuthProvider - React context provider that manages Firebase authentication state.
 * It exposes the current user and loading state to the rest of the application.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth - Custom hook to consume authentication context
 */
export const useAuth = () => useContext(AuthContext);
