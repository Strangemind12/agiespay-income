// 📍 src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Fetch extended user profile (e.g., role)
  const fetchUserProfile = async (sessionUser) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (error) {
        console.warn('Profile fetch error:', error.message);
        return sessionUser; // fallback to basic session user
      }

      return { ...sessionUser, ...data }; // 🧠 Merge Supabase auth and profile
    } catch (err) {
      console.error('Unexpected error fetching profile:', err);
      return sessionUser;
    }
  };

  // 🚀 On load: grab session and profile
  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userWithProfile = await fetchUserProfile(session.user);
        setUser(userWithProfile);
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();

    // 🔁 Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const userWithProfile = await fetchUserProfile(session.user);
        setUser(userWithProfile);
      } else {
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔐 Auth actions
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const register = async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children} {/* ✅ Always render children, let components handle loading */}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
