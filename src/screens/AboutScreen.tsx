import React from 'react';
import { useCinema } from '../context/CinemaContext';

export const AboutScreen: React.FC = () => {
  const { navigateTo } = useCinema();

  return (
    <div className="w-full min-h-screen pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col gap-16">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#aec9eb]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#f7c96d] transition-colors">
            Trang chủ
          </button>
          <span>/</span>
          <span className="text-[#f7c96d] font-semibold">Tuyên Ngôn Thương Hiệu</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-bold text-[#f7c96d] tracking-widest">
              Haute Cinematography & Hospitality
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro'] mt-1">
              Kiến Tạo Chuẩn Mực Điện Ảnh Xa Xỉ
            </h1>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#07203a] border border-[#d9ae55]/30 shadow-lg shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#d3e4ff]">5-Star Concierge</span>
              <span className="text-[10px] text-[#aec9eb]">Chứng nhận chuẩn DCI Hollywood 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Vision & Mission Bento Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Vision Card with Cinematic Visual Backdrop (7 cols) */}
        <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden bg-[#07203a] border border-[#d9ae55]/30 shadow-2xl flex flex-col justify-end p-8 sm:p-12 min-h-[460px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAVyAENq4vFKXjRQr8dl71FWbyc4j7ZNg-h1Bky-CE5H1y3LyojB_vGWFiGyUlugo4-e229jzg6-gRYAGFyJmF_ZAaLKb__ZTpSds1rxqBQJ3wMRsCXLfMX3KzSoebSqgOZPTKWnIt0hclrXLo0-GHhUxG5rWp-7CR4r7Dj1gpqeQJtDjvnQ83cWH36tf-Hcm_YTRLrYGahEIyKHjwkQRmpc_IjlOys_9dGHlIVMCIkAqF0us2gWZO7')",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#000f21] via-[#00142a]/80 to-transparent"></div>

          <div className="relative z-10 flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-2 text-[#f7c96d] text-xs uppercase font-bold tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#f7c96d]"></span>
              Tầm Nhìn Thương Hiệu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Khơi Nguồn Cảm Xúc Hoàn Mỹ Cho Từng Khung Hình
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b2] leading-relaxed">
              Trở thành chuỗi rạp chiếu phim chuẩn xa xỉ hàng đầu Việt Nam, kiến tạo không gian giải trí đỉnh cao nơi mỗi suất chiếu không đơn thuần là xem phim, mà là hành trình chiêm ngưỡng kiệt tác nghệ thuật hoàn mỹ giữa sự tĩnh lặng và riêng tư tuyệt đối.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[#aec9eb] text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">hotel_class</span>
                Không gian riêng tư tối đa
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#f7c96d]">diamond</span>
                Kiến trúc đương đại sang trọng
              </span>
            </div>
          </div>
        </div>

        {/* Mission Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#07203a] border border-[#142b45] p-8 sm:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#f7c96d] text-xs uppercase font-bold tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#f7c96d]"></span>
                Sứ Mệnh Tiên Phong
              </div>
              <span className="material-symbols-outlined text-[#f7c96d] text-3xl">auto_awesome</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Frictionless Luxury: Đỉnh Cao Tiện Nghi & Tốc Độ
            </h2>
            <p className="text-xs sm:text-sm text-[#d1c5b2] leading-relaxed">
              Chúng tôi cam kết xóa bỏ mọi rào cản thao tác với hệ thống đặt vé trực tuyến không ma sát (Frictionless Booking), kết hợp đồng bộ cùng công nghệ trình chiếu chuẩn thính phòng quốc tế và phong thái phục vụ chuẩn Concierge 5 sao tận tụy.
            </p>
          </div>

          <div className="mt-8 p-4 bg-[#00142a] border border-[#203650] rounded-2xl flex items-start gap-3">
            <span className="material-symbols-outlined text-[#f7c96d] text-2xl shrink-0 mt-0.5">room_service</span>
            <div>
              <p className="text-xs font-bold text-[#d3e4ff]">Đặc quyền quản gia cá nhân</p>
              <p className="text-[11px] text-[#aec9eb] mt-0.5">
                Đón tiếp tại sảnh VIP riêng biệt, phục vụ rượu vang hảo hạng và ẩm thực canapé trực tiếp đến tận vị trí ghế ngồi trước giờ khai màn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Frictionless Booking Workflow */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold text-[#f7c96d] tracking-widest">
            Trải Nghiệm Khách Hàng
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] mt-1">
            Quy Trình Đặt Vé Chuẩn Xa Xỉ 4 Bước
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] flex flex-col gap-3">
            <span className="text-2xl font-black font-mono text-[#f7c96d]">01</span>
            <h3 className="text-sm font-bold text-[#d3e4ff]">Tuyển Chọn Tác Phẩm</h3>
            <p className="text-xs text-[#aec9eb] leading-relaxed">
              Lựa chọn các siêu phẩm Hollywood được chiếu với bản mã hóa DCP 4K và âm thanh vòm Dolby Atmos đa hướng.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] flex flex-col gap-3">
            <span className="text-2xl font-black font-mono text-[#f7c96d]">02</span>
            <h3 className="text-sm font-bold text-[#d3e4ff]">Khóa Ghế Atomic Lock</h3>
            <p className="text-xs text-[#aec9eb] leading-relaxed">
              Sơ đồ ghế tương tác trực quan thời gian thực. Hệ thống tạm khóa giữ chỗ an toàn trong suốt 9 phút.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] flex flex-col gap-3">
            <span className="text-2xl font-black font-mono text-[#f7c96d]">03</span>
            <h3 className="text-sm font-bold text-[#d3e4ff]">Thanh Toán Một Chạm</h3>
            <p className="text-xs text-[#aec9eb] leading-relaxed">
              Hỗ trợ quét mã MoMo QR, VNPay, thẻ tín dụng bảo mật 3D-Secure hoặc tích lũy điểm hội viên Nova Elite.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] flex flex-col gap-3">
            <span className="text-2xl font-black font-mono text-[#f7c96d]">04</span>
            <h3 className="text-sm font-bold text-[#d3e4ff]">Quét Mã SmartGate</h3>
            <p className="text-xs text-[#aec9eb] leading-relaxed">
              Vé điện tử chuẩn VIP Boarding Pass với mã QR tích hợp Apple Wallet, vào phòng chiếu qua cổng tự động không cần in vé.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#031c36] border border-[#d9ae55]/30 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl">
        <div>
          <div className="text-3xl sm:text-5xl font-black font-mono text-[#f7c96d]">99.8%</div>
          <span className="text-xs text-[#aec9eb] font-semibold mt-1 block">Độ Hài Lòng Khách VIP</span>
        </div>
        <div>
          <div className="text-3xl sm:text-5xl font-black font-mono text-[#d3e4ff]">03</div>
          <span className="text-xs text-[#aec9eb] font-semibold mt-1 block">Cụm Rạp Flagship</span>
        </div>
        <div>
          <div className="text-3xl sm:text-5xl font-black font-mono text-[#f7c96d]">150k+</div>
          <span className="text-xs text-[#aec9eb] font-semibold mt-1 block">Hội Viên Nova Elite Club</span>
        </div>
        <div>
          <div className="text-3xl sm:text-5xl font-black font-mono text-[#d3e4ff]">24/7</div>
          <span className="text-xs text-[#aec9eb] font-semibold mt-1 block">Quản Gia Concierge Phục Vụ</span>
        </div>
      </section>
    </div>
  );
};
