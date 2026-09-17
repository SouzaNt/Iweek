import React, { createContext, useContext, useState, useEffect } from 'react';

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

  const loginWithGoogle = () => {
    const mockGoogleUser = {
      id: 'g_' + Date.now(),
      name: 'Estudante NorTech',
      email: 'estudante.tech@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      joinedAt: new Date().toISOString()
    };
    handleLoginSuccess(mockGoogleUser);
    return mockGoogleUser;
  };

  const loginWithEmail = ({ name, email, password, isSignUp = false }) => {
    const emailUser = {
      id: 'usr_' + Date.now(),
      name: name || email.split('@')[0] || 'Usuário NorTech',
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      provider: 'email',
      isSignUp,
      joinedAt: new Date().toISOString()
    };
    handleLoginSuccess(emailUser);
    return emailUser;
  };

  const loginWithPhone = ({ phone, code, isSignUp = false }) => {
    const phoneUser = {
      id: 'ph_' + Date.now(),
      name: 'Explorador Tech',
      phone: phone,
      email: `${phone.replace(/\D/g, '')}@nortech.app`,
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(phone)}`,
      provider: 'phone',
      isSignUp,
      joinedAt: new Date().toISOString()
    };
    handleLoginSuccess(phoneUser);
    return phoneUser;
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
        loginWithPhone,
        logout
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
