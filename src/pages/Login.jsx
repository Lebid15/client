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
      // 1. تسجيل الدخول والحصول على توكنات JWT
      const res = await axios.post('https://watan-store-app-2742b6ac556c.herokuapp.com/api/token/', {
        email,
        password,
      });

      const access = res.data.access;
      const refresh = res.data.refresh;

      // 2. حفظ التوكنات في localStorage
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);

      // 3. جلب بيانات المستخدم (بما في ذلك api_token)
      const profileRes = await axios.get('https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/profile-by-token/', {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      const apiToken = profileRes.data.api_token;
      localStorage.setItem('api_token', apiToken);

      // 4. تحديد صلاحيات المستخدم للتوجيه
      const isAdmin = profileRes.data.is_staff || profileRes.data.is_superuser;

      console.log('User profile:', profileRes.data);
      alert('تم تسجيل الدخول بنجاح');
      navigate('/'); 

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
