// src/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = جارٍ التحميل، undefined = غير مسجل دخول

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(undefined); // لا يوجد توكن => غير مسجل دخول
      return;
    }
    try {
      const res = await axios.get('https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/profile-by-token/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("بيانات المستخدم:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error('فشل في تحميل بيانات المستخدم:', err);
      setUser(undefined); // في حالة الخطأ اعتبر المستخدم غير مسجل دخول
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
