import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  if (user === null) {
    // بيانات المستخدم لا تزال تُحمّل
    return <div className="p-4 text-center text-gray-500">جاري التحميل...</div>;
  }

  if (!user) {
    // المستخدم غير مسجل دخول
    return <Navigate to="/login" replace />;
  }

  if (!user.is_staff && !user.is_superuser) {
    // المستخدم ليس مشرفاً
    return (
      <div className="p-4 text-center text-red-600 font-bold">
        ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </div>
    );
  }

  return children;
};

export default AdminRoute;
