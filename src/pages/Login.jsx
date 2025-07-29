import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ تسجيل الدخول للحصول على access + refresh
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      });

      const access = res.data.access;
      const refresh = res.data.refresh;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);

      // ✅ جلب بيانات المستخدم (بما فيها api_token والصلاحيات) باستخدام JWT
      const profileRes = await axios.get('http://127.0.0.1:8000/api/accounts/profile-by-token/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const apiToken = profileRes.data.api_token;
      localStorage.setItem('api_token', apiToken); // ← حفظ توكن API

      // تحديد ما إذا كان المستخدم مشرفاً
      const isAdmin = profileRes.data.is_staff || profileRes.data.is_superuser;

      alert('تم تسجيل الدخول بنجاح');

      // التوجيه حسب الصلاحيات
      if (isAdmin) {
        navigate('/admin/price-groups'); // ➡️ لوحة تحكم المشرفين
      } else {
        navigate('/'); // ➡️ الصفحة الرئيسية للمستخدم العادي
      }
    } catch (err) {
      console.error(err);
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm text-gray-600">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">كلمة المرور</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            دخول
          </button>
        </form>

        {/* إضافة عبارة أسفل زر الدخول */}
        <p className="mt-4 text-center text-sm text-gray-600">
          لم يكن لديك حساب؟{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            سجل الآن
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
