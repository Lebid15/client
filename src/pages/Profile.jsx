// client/src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("لم يتم تسجيل الدخول.");
        return;
      }

      try {
        const res = await axios.get("https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError("فشل في جلب البيانات. تأكد من أنك مسجل الدخول.");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-10">جارٍ تحميل البيانات...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">الملف الشخصي</h2>
        <p><strong>الاسم:</strong> {user.name}</p>
        <p><strong>البريد الإلكتروني:</strong> {user.email}</p>
        <p><strong>رقم الجوال:</strong> {user.country_code} {user.phone}</p>
        <p className="text-sm text-green-500 font-mono break-all">
          التوكن الخاص بك: {user.api_token}
        </p>
      </div>
    </div>
  );
};

export default Profile;
