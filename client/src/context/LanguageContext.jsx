import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

const translations = {
  vi: {
    nav_about: "Về Tôi",
    nav_projects: "Dự Án",
    nav_contact: "Liên Hệ",
    nav_dashboard: "Quản Trị",
    nav_logout: "Đăng Xuất",
    nav_login: "Đăng Nhập",
    
    hero_available: "Sẵn sàng đón nhận cơ hội mới",
    hero_hi: "Xin chào, tôi là",
    hero_desc: "Tôi thiết kế và tạo ra những trải nghiệm số tuyệt vời cho nền tảng web, với sự tự hào về giao diện hoàn mỹ mang lại hiệu suất tối đa.",
    hero_btn_projects: "Khám Phá Dự Án",
    hero_btn_about: "Về Bản Thân",
    
    about_title: "Về Bản Thân",
    about_skills: "Kỹ Năng Nổi Bật",
    
    projects_title: "Dự Án Nổi Bật",
    projects_no_image: "Chưa có hình",
    projects_code: "Mã nguồn",
    projects_demo: "Xem thử",
    projects_empty: "Chưa có dự án nào để hiển thị.",
    
    contact_title: "Kết Nối",
    contact_desc: "Bạn có câu hỏi hoặc muốn hợp tác? Hãy để lại lời nhắn.",
    contact_name: "Tên",
    contact_email: "Email",
    contact_msg: "Tin nhắn...",
    contact_btn: "Gửi Tin Nhắn",
    contact_success: "Gửi lời nhắn thành công!",
    contact_error: "Gửi thất bại. Vui lòng thử lại sau.",
    footer_rights: "© 2026 DevFolio. Đã đăng ký bản quyền."
  },
  en: {
    nav_about: "About",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_dashboard: "Dashboard",
    nav_logout: "Logout",
    nav_login: "Login",
    
    hero_available: "Available for new opportunities",
    hero_hi: "Hi, I'm",
    hero_desc: "I design and create exceptional digital experiences for the web, taking pride in flawless interfaces that deliver maximum performance.",
    hero_btn_projects: "Explore Projects",
    hero_btn_about: "About Me",
    
    about_title: "About Me",
    about_skills: "Technical Skills",
    
    projects_title: "Featured Projects",
    projects_no_image: "No Image",
    projects_code: "Source Code",
    projects_demo: "Live Demo",
    projects_empty: "No projects to display yet.",
    
    contact_title: "Get In Touch",
    contact_desc: "Have a question or want to work together? Leave a message.",
    contact_name: "Name",
    contact_email: "Email",
    contact_msg: "Your message...",
    contact_btn: "Send Message",
    contact_success: "Message sent successfully!",
    contact_error: "Failed to send message. Please try again.",
    footer_rights: "© 2026 DevFolio. All rights reserved."
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'vi'; // Default to vietnamese
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'vi' ? 'en' : 'vi'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
