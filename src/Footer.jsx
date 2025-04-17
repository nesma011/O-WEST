import { ArrowUp } from 'lucide-react';
import React from 'react';

const Footer = ({ phoneNumber }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 gap-4 py-6">
        <div>
          <h4 className="text-l font-semibold text-center">
            مزيد من المعلومات وخطط السداد والوحدات المتاحة، لا تتردد فى التواصل معنا
          </h4>
        </div>

        <div>
          <p className="text-sm text-center">📞 {phoneNumber || "LOADING.."}</p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={scrollToTop}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-full flex items-center gap-2 transition"
          >
            <ArrowUp size={18} />
            إلى الأعلى
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 pb-4">
        © {new Date().getFullYear()} جميع الحقوق محفوظة
      </div>
    </footer>
  );
};

export default Footer;
