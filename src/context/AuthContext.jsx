import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('luxurycars_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Define Admin Credentials
    const ADMIN_EMAIL = 'admin@luxe.com';
    const ADMIN_PASSWORD = 'admin';

    let role = 'buyer';
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      role = 'admin';
    } else if (email.includes('seller')) {
      role = 'seller';
    }

    if (email === ADMIN_EMAIL && password !== ADMIN_PASSWORD) {
      throw new Error('Invalid Admin Password');
    }

    const userData = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role,
      phone: '+91 98765 43210',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('luxurycars_user', JSON.stringify(userData));
    return userData;
  };

  const register = (name, email, password, role = 'buyer') => {
    const userData = {
      id: Date.now(),
      name,
      email,
      role,
      phone: '',
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    setUser(userData);
    localStorage.setItem('luxurycars_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxurycars_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
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
