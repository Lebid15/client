import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [currencies, setCurrencies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    country_code: "TR",
    phone: "",
    currency: "",
  });

  useEffect(() => {
    axios.get("https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/currencies/")
      .then((res) => setCurrencies(res.data))
      .catch((err) => console.error("فشل في تحميل العملات:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      alert("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      const payload = {
        ...formData,
        currency: formData.currency || null,
      };

      await axios.post("https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/register/", payload);
      alert("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
      navigate("/login");
    } catch (error) {
      console.error("فشل التسجيل:", error.response?.data);
      alert("حدث خطأ أثناء التسجيل: " + JSON.stringify(error.response?.data));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">تسجيل حساب جديد</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-sm text-gray-600">اسم المستخدم</label>
            <input
              type="text"
              name="name"
              placeholder="مثال: محمد أحمد"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">كلمة المرور</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirm"
              placeholder="********"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">رقم الجوال</label>
            <div className="flex gap-2">
              <select
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="w-1/3 border border-gray-300 rounded px-2 py-2 focus:outline-none"
              >
                <option value="TR">+90 (تركيا)</option>
                <option value="SA">+966 (السعودية)</option>
                <option value="AE">+971 (الإمارات)</option>
                <option value="IQ">+964 (العراق)</option>
                <option value="EG">+20 (مصر)</option>
              </select>
              <input
                type="text"
                name="phone"
                placeholder="رقم الجوال"
                className="w-2/3 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">العملة</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            >
              <option value="">اختر العملة</option>
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            تسجيل
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              اضغط هنا لتسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
