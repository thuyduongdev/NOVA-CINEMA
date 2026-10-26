import React, { useState } from 'react';
import { useCinema } from '../../context/CinemaContext';
import { AdminLayout } from './AdminLayout';

export const AdminOverviewScreen: React.FC = () => {
  const { bookings, navigateTo, showNotification } = useCinema();

  const [selectedBranch, setSelectedBranch] = useState('all');
  const [timeRange, setTimeRange] = useState('today');
  const [searchBooking, setSearchBooking] = useState('');

  const filteredBookings = bookings.filter((b) => {
    if (searchBooking.trim()) {
      const q = searchBooking.toLowerCase();
      return (
        b.bookingCode.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.movieTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleRefresh = () => {
    showNotification({
      type: 'success',
      title: 'Đã làm mới dữ liệu',
      message: 'Toàn bộ chỉ số doanh thu và trạng thái phòng vé đã được đồng bộ trực tiếp.',
    });
  };

  const handleExportCSV = () => {
    alert('Đã tạo và tải file CSV: NOVA_Cinema_Revenue_Report_2025.csv');
  };

  return (
    <AdminLayout activeSection="admin-overview">
      <div className="flex flex-col gap-8 max-w-7xl">
        {/* Top Action & Filter Header */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#f7c96d]">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              <span className="text-xs uppercase tracking-widest font-bold">
                Phòng Điều Hành Khai Thác Rạp Chiếu (AD01)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] tracking-tight font-['Be_Vietnam_Pro']">
              Bảng Điều Khiển Trung Tâm NOVA CINEMA
            </h1>
            <p className="text-xs text-[#aec9eb]">
              Giám sát hiệu suất vận hành thời gian thực, quản lý suất chiếu và doanh thu phòng vé toàn quốc.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Branch selector */}
            <div className="bg-[#07203a] border border-[#203650] rounded-xl px-3 py-2 flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">location_on</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-[#aec9eb] font-semibold">Cụm rạp</span>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-transparent text-[#d3e4ff] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#07203a]">Toàn quốc (3 Cụm Flagship)</option>
                  <option value="landmark" className="bg-[#07203a]">NOVA Landmark 81 VIP</option>
                  <option value="westlake" className="bg-[#07203a]">NOVA West Lake Hà Nội</option>
                </select>
              </div>
            </div>

            {/* Time range */}
            <div className="bg-[#07203a] border border-[#203650] rounded-xl px-3 py-2 flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[#f7c96d] text-[18px]">calendar_today</span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase text-[#aec9eb] font-semibold">Thời gian</span>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-[#d3e4ff] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="today" className="bg-[#07203a]">Hôm nay, 18/05/2025</option>
                  <option value="yesterday" className="bg-[#07203a]">Hôm qua, 17/05/2025</option>
                  <option value="weekend" className="bg-[#07203a]">Cuối tuần qua</option>
                </select>
              </div>
            </div>

            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              className="py-3 px-4 rounded-xl bg-[#f7c96d] hover:bg-[#ffdea2] text-[#402d00] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-[#f7c96d]/20 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
              <span>Làm Mới</span>
            </button>
          </div>
        </div>

        {/* Conflict Detector AD04 Notification Strip */}
        <div className="relative overflow-hidden bg-[#07203a] border border-[#22c55e]/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#d3e4ff]">
                  Bộ Kiểm Soát Xung Đột Lịch Chiếu (AD04 Smart Conflict Detector)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                  Hoạt động 100%
                </span>
              </div>
              <p className="text-xs text-[#aec9eb] mt-0.5">
                Hệ thống xác thực thuật toán: Kiểm tra tự động 11 phòng chiếu, đảm bảo khoảng đệm dọn dẹp vệ sinh tối thiểu +15 phút giữa các suất chiếu kế tiếp.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('admin-schedule')}
            className="px-4 py-2 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] border border-[#d9ae55]/30 text-xs font-bold shrink-0 transition-colors"
          >
            Mở Bảng Gantt AD04
          </button>
        </div>

        {/* 4 KPI METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* KPI 1 */}
          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#f7c96d]/40 transition-colors">
            <div className="flex items-center justify-between text-[#aec9eb]">
              <span className="text-[10px] uppercase font-bold tracking-wider">Doanh thu phòng vé hôm nay</span>
              <div className="w-8 h-8 rounded-lg bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] font-mono">
                248.5 <span className="text-xs text-[#f7c96d] font-sans">Triệu VNĐ</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#22c55e] font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+18.2% so với hôm qua</span>
              </div>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#f7c96d]/40 transition-colors">
            <div className="flex items-center justify-between text-[#aec9eb]">
              <span className="text-[10px] uppercase font-bold tracking-wider">Tỷ lệ lấp đầy phòng chiếu</span>
              <div className="w-8 h-8 rounded-lg bg-[#142b45] flex items-center justify-center text-[#22c55e]">
                <span className="material-symbols-outlined text-[18px]">airline_seat_recline_extra</span>
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] font-mono">
                82.4% <span className="text-xs text-[#aec9eb] font-sans">/ 1,840 ghế</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#22c55e] font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>Kỷ lục cuối tuần</span>
              </div>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#f7c96d]/40 transition-colors">
            <div className="flex items-center justify-between text-[#aec9eb]">
              <span className="text-[10px] uppercase font-bold tracking-wider">Suất chiếu đang chạy</span>
              <div className="w-8 h-8 rounded-lg bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
                <span className="material-symbols-outlined text-[18px]">theaters</span>
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] font-mono">
                84 <span className="text-xs text-[#aec9eb] font-sans">Suất / Ngày</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#aec9eb]">
                <span className="text-[#f7c96d] font-semibold">100% đúng giờ</span>
                <span>• Không lỗi DCP</span>
              </div>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-6 rounded-2xl bg-[#07203a] border border-[#142b45] shadow-xl flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#f7c96d]/40 transition-colors">
            <div className="flex items-center justify-between text-[#aec9eb]">
              <span className="text-[10px] uppercase font-bold tracking-wider">Khách VIP Check-in</span>
              <div className="w-8 h-8 rounded-lg bg-[#142b45] flex items-center justify-center text-[#f7c96d]">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#d3e4ff] font-mono">
                1,420 <span className="text-xs text-[#aec9eb] font-sans">Lượt khách</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-[#f7c96d] font-semibold">
                <span>94% qua cổng SmartGate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Revenue by Film (7 cols) */}
          <div className="lg:col-span-7 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#142b45]">
              <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
                Cơ Cấu Doanh Thu Theo Phim Hôm Nay
              </h3>
              <span className="text-xs text-[#f7c96d] font-bold">248.5 Triệu</span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#d3e4ff]">Dune: Hành Tinh Cát - Phần Hai</span>
                  <span className="font-mono text-[#f7c96d] font-bold">114.2M (46%)</span>
                </div>
                <div className="w-full bg-[#00142a] h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#d9ae55] to-[#f7c96d]" style={{ width: '46%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#d3e4ff]">Oppenheimer (Bản 70mm Scan)</span>
                  <span className="font-mono text-[#f7c96d] font-bold">72.0M (29%)</span>
                </div>
                <div className="w-full bg-[#00142a] h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#aec9eb] to-[#d3e4ff]" style={{ width: '29%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#d3e4ff]">Mai (ĐD Trấn Thành)</span>
                  <span className="font-mono text-[#f7c96d] font-bold">40.8M (16.5%)</span>
                </div>
                <div className="w-full bg-[#00142a] h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#e7cc9d] to-[#cab183]" style={{ width: '16.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-[#d3e4ff]">Godzilla x Kong: Đế Chế Mới</span>
                  <span className="font-mono text-[#f7c96d] font-bold">21.5M (8.5%)</span>
                </div>
                <div className="w-full bg-[#00142a] h-2.5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#304b68]" style={{ width: '8.5%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Format distribution (5 cols) */}
          <div className="lg:col-span-5 bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col justify-between gap-5">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro'] pb-3 border-b border-[#142b45]">
              Tỷ Trọng Theo Định Dạng Phòng Chiếu
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#00142a] border border-[#203650]">
                <span className="text-[10px] uppercase text-[#f7c96d] font-bold">IMAX Laser GT</span>
                <div className="text-xl font-extrabold text-[#d3e4ff] font-mono mt-1">48.2%</div>
                <span className="text-[10px] text-[#aec9eb]">119.8 Triệu VNĐ</span>
              </div>

              <div className="p-4 rounded-xl bg-[#00142a] border border-[#203650]">
                <span className="text-[10px] uppercase text-[#aec9eb] font-bold">VIP Suite Lounge</span>
                <div className="text-xl font-extrabold text-[#d3e4ff] font-mono mt-1">26.4%</div>
                <span className="text-[10px] text-[#aec9eb]">65.6 Triệu VNĐ</span>
              </div>

              <div className="p-4 rounded-xl bg-[#00142a] border border-[#203650]">
                <span className="text-[10px] uppercase text-[#aec9eb] font-bold">Dolby Atmos</span>
                <div className="text-xl font-extrabold text-[#d3e4ff] font-mono mt-1">17.6%</div>
                <span className="text-[10px] text-[#aec9eb]">43.7 Triệu VNĐ</span>
              </div>

              <div className="p-4 rounded-xl bg-[#00142a] border border-[#203650]">
                <span className="text-[10px] uppercase text-[#aec9eb] font-bold">ScreenX 270°</span>
                <div className="text-xl font-extrabold text-[#d3e4ff] font-mono mt-1">7.8%</div>
                <span className="text-[10px] text-[#aec9eb]">19.4 Triệu VNĐ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-[#07203a] border border-[#142b45] rounded-3xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-[#142b45]">
            <h3 className="text-base font-bold text-[#d3e4ff] font-['Be_Vietnam_Pro']">
              Giao Dịch Đặt Vé Thời Gian Thực (Toàn Hệ Thống)
            </h3>

            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Tìm mã vé hoặc khách hàng..."
                value={searchBooking}
                onChange={(e) => setSearchBooking(e.target.value)}
                className="bg-[#00142a] text-[#d3e4ff] text-xs border border-[#203650] rounded-xl px-3 py-1.5 focus:border-[#f7c96d] focus:outline-none"
              />
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 rounded-xl bg-[#142b45] hover:bg-[#203650] text-[#f7c96d] text-xs font-semibold border border-[#d9ae55]/30 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Xuất CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#aec9eb]">
              <thead className="text-[11px] uppercase tracking-wider text-[#f7c96d] bg-[#00142a] border-b border-[#203650]">
                <tr>
                  <th className="py-3 px-4">Mã Vé</th>
                  <th className="py-3 px-4">Khách Hàng</th>
                  <th className="py-3 px-4">Tác Phẩm & Suất Chiếu</th>
                  <th className="py-3 px-4">Vị Trí Ghế</th>
                  <th className="py-3 px-4">Tổng Tiền</th>
                  <th className="py-3 px-4">Cổng TT</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#142b45]">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#142b45]/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#f7c96d]">
                      #{b.bookingCode}
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-[#d3e4ff] block">{b.customerName}</strong>
                      <span className="text-[10px] text-[#9a8f7e]">{b.customerPhone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[#d3e4ff] font-semibold block truncate max-w-xs">{b.movieTitle}</span>
                      <span className="text-[10px] text-[#f7c96d] font-mono">{b.time}</span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#f7c96d]">
                      {b.seats.join(', ')}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#d3e4ff]">
                      {b.total.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-4 uppercase font-semibold text-[10px] text-[#aec9eb]">
                      {b.paymentMethod}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'confirmed'
                            ? 'bg-[#22c55e]/20 text-[#22c55e]'
                            : 'bg-[#93000a]/20 text-[#ffb4ab]'
                        }`}
                      >
                        {b.status === 'confirmed' ? 'Đã thanh toán' : 'Đã hủy'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
