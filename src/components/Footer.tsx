import React from 'react';
import { useCinema } from '../context/CinemaContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useCinema();

  return (
    <footer className="w-full bg-[#000f21] border-t border-[#142b45] text-[#aec9eb] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#142b45]">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#d9ae55] to-[#f7c96d] p-0.5 shadow-lg shadow-[#f7c96d]/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#00142a] rounded-[6px] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#f7c96d] text-[20px]">theaters</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-['Be_Vietnam_Pro'] font-bold text-lg uppercase tracking-wider text-[#f7c96d]">
                  NOVA CINEMA
                </span>
                <span className="text-[10px] uppercase text-[#aec9eb] tracking-[0.2em] font-medium">
                  Luxury Experience
                </span>
              </div>
            </div>

            <p className="text-sm text-[#d1c5b2] leading-relaxed max-w-sm">
              Chuỗi rạp chiếu phim chuẩn xa xỉ tiên phong tại Việt Nam. Nơi điện ảnh thăng hoa cùng kiến trúc đương đại, hệ thống chiếu kép IMAX Laser đỉnh cao và phong thái phục vụ VIP Concierge 5 sao.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#f7c96d] pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#07203a] border border-[#d9ae55]/30">
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span className="font-semibold">Hotline VIP 24/7: 1900 8899</span>
              </div>
            </div>
          </div>

          {/* Col 2: Hệ thống cụm rạp */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f7c96d] font-bold font-['Be_Vietnam_Pro']">
              Flagship Theaters
            </h4>
            <ul className="space-y-2.5 text-xs text-[#aec9eb]">
              <li className="hover:text-[#f7c96d] transition-colors cursor-pointer">
                <strong>NOVA Landmark 81</strong>
                <p className="text-[11px] text-[#9a8f7e]">Tầng B1, Vincom Landmark 81, TP. HCM</p>
              </li>
              <li className="hover:text-[#f7c96d] transition-colors cursor-pointer">
                <strong>NOVA West Lake</strong>
                <p className="text-[11px] text-[#9a8f7e]">Tầng 4, Lotte Mall West Lake, Hà Nội</p>
              </li>
              <li className="hover:text-[#f7c96d] transition-colors cursor-pointer">
                <strong>NOVA Bà Triệu</strong>
                <p className="text-[11px] text-[#9a8f7e]">Tháp B, Vincom Center 191 Bà Triệu, HN</p>
              </li>
            </ul>
          </div>

          {/* Col 3: Định dạng & Dịch vụ */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f7c96d] font-bold font-['Be_Vietnam_Pro']">
              Công nghệ & Đặc quyền
            </h4>
            <ul className="space-y-2 text-xs text-[#aec9eb]">
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-[#d3e4ff] transition-colors">Màn chiếu IMAX Laser GT Dual</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-[#d3e4ff] transition-colors">Âm thanh Dolby Atmos 12.0</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-[#d3e4ff] transition-colors">Ghế lười Suite Lounger bọc da Ý</button></li>
              <li><button onClick={() => navigateTo('profile')} className="hover:text-[#d3e4ff] transition-colors">Thành viên Nova Elite Gold Club</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-[#d3e4ff] transition-colors">Thuê phòng chiếu riêng (Private Event)</button></li>
            </ul>
          </div>

          {/* Col 4: Hỗ trợ & Khách hàng */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f7c96d] font-bold font-['Be_Vietnam_Pro']">
              Chính sách & Hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs text-[#aec9eb]">
              <li><button onClick={() => navigateTo('my-tickets')} className="hover:text-[#d3e4ff] transition-colors">Tra cứu vé đã đặt</button></li>
              <li><button onClick={() => navigateTo('pricing')} className="hover:text-[#d3e4ff] transition-colors">Bảng giá vé & Ưu đãi thành viên</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-[#d3e4ff] transition-colors">Chính sách hoàn tiền & Hủy vé</button></li>
              <li><button onClick={() => navigateTo('contact')} className="hover:text-[#d3e4ff] transition-colors">Xuất hóa đơn VAT điện tử</button></li>
              <li><button onClick={() => navigateTo('about')} className="hover:text-[#d3e4ff] transition-colors">Quy chuẩn DCI Hollywood</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#9a8f7e]">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2025 NOVA CINEMA Co., Ltd. Tất cả quyền được bảo lưu.</span>
            <span>•</span>
            <span className="text-[#f7c96d]">Giấy phép DCI Hollywood Certification #DCI-8924</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#aec9eb]">Phương thức thanh toán bảo mật:</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#07203a] border border-[#203650] text-[#aec9eb] font-semibold text-[10px]">
                MoMo QR
              </span>
              <span className="px-2 py-0.5 rounded bg-[#07203a] border border-[#203650] text-[#aec9eb] font-semibold text-[10px]">
                VNPay
              </span>
              <span className="px-2 py-0.5 rounded bg-[#07203a] border border-[#203650] text-[#aec9eb] font-semibold text-[10px]">
                Visa / MC
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
