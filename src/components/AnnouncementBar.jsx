// src/components/AnnouncementBar.jsx
import React from 'react';
import Marquee from 'react-fast-marquee';

const AnnouncementBar = () => {
  return (
    <div className="bg-yellow-500 text-black py-2 text-sm font-medium mt-2">
      <Marquee pauseOnHover gradient={false}>
        🎉 نقوم بتصميم موقع جديد للسيد محمد الكدرو — ⚠️ تنبيه: خدمة PUBG متوقفة مؤقتًا — 🆕 أضفنا فئة جديدة: IPTV!
      </Marquee>
    </div>
  );
};

export default AnnouncementBar;
