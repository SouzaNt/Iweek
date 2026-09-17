import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  registerUser as dbRegisterUser, 
  loginUser as dbLoginUser, 
  authenticateGoogleUser as dbAuthenticateGoogleUser, 
  authenticatePhoneUser as dbAuthenticatePhoneUser,
  getAllUsers
} from '../data/usersDatabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nortech_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nortech_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nortech_user');
    }
  }, [user]);

  const openAuthModal = (callback = null) => {
    setOnSuccessCallback(() => callback);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setOnSuccessCallback(null);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
    if (onSuccessCallback && typeof onSuccessCallback === 'function') {
      onSuccessCallback();
      setOnSuccessCallback(null);
    }
  };

  // 1. Google OAuth Authenticate
  const loginWithGoogle = (googleData) => {
    const result = dbAuthenticateGoogleUser(googleData);
    if (result.success && result.user) {
      handleLoginSuccess(result.user);
    }
    return result;
  };

  // 2. Email Login
  const loginWithEmail = ({ email, password }) => {
    const result = dbLoginUser({ email, password });
    if (result.success && result.user) {
      handleLoginSuccess(result.user);
    }
    return result;
  };

  // 3. Email Register (Cadastro)
  const registerWithEmail = ({ name, email, password }) => {
    const result = dbRegisterUser({ name, email, password, provider: 'email' });
    if (result.success && result.user) {
      handleLoginSuccess(result.user);
    }
    return result;
  };

  // 4. Phone Login / Register
  const loginWithPhone = ({ phone, code, isSignUp = false, name = '' }) => {
    const result = dbAuthenticatePhoneUser({ phone, code, isSignUp, name });
    if (result.success && result.user) {
      handleLoginSuccess(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nortech_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginWithPhone,
        logout,
        getAllUsers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

