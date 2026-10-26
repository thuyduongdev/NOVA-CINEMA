import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Movie,
  Cinema,
  Showtime,
  Booking,
  MOVIES,
  CINEMAS,
  INITIAL_SHOWTIMES,
  INITIAL_BOOKINGS,
  COMBOS,
} from '../data/cinemaData';

export type ViewType =
  | 'home'
  | 'movies'
  | 'movie-detail'
  | 'schedule'
  | 'pricing'
  | 'about'
  | 'contact'
  | 'profile'
  | 'my-tickets'
  | 'seat-selection'
  | 'checkout'
  | 'auth'
  | 'admin-overview'
  | 'admin-schedule'
  | 'admin-movies'
  | 'admin-theaters'
  | 'admin-bookings'
  | 'admin-members';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  tier: 'Gold Tier' | 'Platinum Tier' | 'Diamond Tier';
  points: number;
  annualSpend: number;
  avatar: string;
  memberId: string;
  role: 'client' | 'admin';
}

interface CinemaContextType {
  currentView: ViewType;
  navigateTo: (view: ViewType, params?: { movieId?: string; showtimeId?: string; bookingId?: string }) => void;
  user: UserProfile;
  isLoggedIn: boolean;
  login: (email: string, role: 'client' | 'admin') => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Catalog & Scheduling Data
  movies: Movie[];
  showtimes: Showtime[];
  cinemas: Cinema[];
  selectedMovieId: string | null;
  selectedShowtimeId: string | null;

  // Active Booking state
  selectedMovie: Movie;
  selectedCinema: Cinema;
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  selectedShowtime: Showtime;
  selectedSeats: string[];
  selectedCombos: { [comboId: string]: number };
  appliedVoucher: { code: string; discount: number } | null;
  lockCountdown: number; // in seconds
  resetLockTimer: () => void;
  toggleSeat: (seatId: string) => void;
  updateComboQuantity: (comboId: string, quantity: number) => void;
  applyVoucherCode: (code: string) => { success: boolean; message: string };
  clearBookingFlow: () => void;
  startBookingForMovie: (movieId: string) => void;
  startBookingForShowtime: (showtimeId: string) => void;
  proceedToCheckout: () => void;
  simulatePaymentSuccess: (paymentMethod: 'momo' | 'vnpay' | 'card' | 'points') => Booking;

  // Bookings list
  bookings: Booking[];
  activeTicket: Booking | null;
  cancelBooking: (bookingCode: string) => void;

  // Admin Controls
  adminAddMovie: (movie: Omit<Movie, 'id'>) => void;
  adminDeleteMovie: (id: string) => void;
  adminAddShowtime: (showtime: Omit<Showtime, 'id'>) => { success: boolean; conflictMessage?: string };
  adminDeleteShowtime: (id: string) => void;

  // Global Toast / Notice
  notification: { type: 'success' | 'error' | 'info'; title: string; message: string } | null;
  showNotification: (notif: { type: 'success' | 'error' | 'info'; title: string; message: string }) => void;
  clearNotification: () => void;
}

const CinemaContext = createContext<CinemaContextType | null>(null);

export const CinemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>('dune-2');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>('st-01');

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>({
    name: 'Alexandre Nguyen',
    email: 'khachhang.vip@novacinema.vn',
    phone: '0908 123 456',
    tier: 'Gold Tier',
    points: 4850,
    annualSpend: 28500000,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3',
    memberId: 'NV-GOLD-8921',
    role: 'client',
  });

  // Data lists
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [showtimes, setShowtimes] = useState<Showtime[]>(INITIAL_SHOWTIMES);
  const [cinemas] = useState<Cinema[]>(CINEMAS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Active Booking Flow
  const [selectedCinema, setSelectedCinema] = useState<Cinema>(CINEMAS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('2025-05-18');
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['F07', 'F08']);
  const [selectedCombos, setSelectedCombos] = useState<{ [comboId: string]: number }>({
    'combo-gold': 1,
  });
  const [appliedVoucher, setAppliedVoucher] = useState<{ code: string; discount: number } | null>({
    code: 'VIPGOLD10',
    discount: 50000,
  });
  const [lockCountdown, setLockCountdown] = useState<number>(540); // 9 minutes

  // Toast notifications
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  } | null>({
    type: 'success',
    title: 'Giao dịch thành công',
    message: 'Thanh toán thành công! Mã đơn hàng #NOVA-894215 đã được xác nhận vào hệ thống.',
  });

  // Countdown timer effect
  useEffect(() => {
    if (currentView !== 'seat-selection' && currentView !== 'checkout') return;
    const interval = setInterval(() => {
      setLockCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [currentView]);

  const resetLockTimer = () => setLockCountdown(540);

  const showNotification = (notif: { type: 'success' | 'error' | 'info'; title: string; message: string }) => {
    setNotification(notif);
  };

  const clearNotification = () => setNotification(null);

  const navigateTo = (
    view: ViewType,
    params?: { movieId?: string; showtimeId?: string; bookingId?: string }
  ) => {
    if (params?.movieId) {
      setSelectedMovieId(params.movieId);
    }
    if (params?.showtimeId) {
      setSelectedShowtimeId(params.showtimeId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, role: 'client' | 'admin') => {
    setIsLoggedIn(true);
    if (role === 'admin') {
      setUser({
        name: 'Alexandre Nguyen (Super Admin)',
        email: 'admin.master@novacinema.vn',
        phone: '0909 999 888',
        tier: 'Diamond Tier',
        points: 99999,
        annualSpend: 150000000,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3',
        memberId: 'NV-ADMIN-001',
        role: 'admin',
      });
      navigateTo('admin-overview');
    } else {
      setUser({
        name: 'Alexandre Nguyen',
        email: email || 'khachhang.vip@novacinema.vn',
        phone: '0908 123 456',
        tier: 'Gold Tier',
        points: 4850,
        annualSpend: 28500000,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3',
        memberId: 'NV-GOLD-8921',
        role: 'client',
      });
      navigateTo('home');
    }
    showNotification({
      type: 'success',
      title: 'Đăng nhập thành công',
      message: `Chào mừng ${role === 'admin' ? 'Quản trị viên' : 'Hội viên VIP'} quay trở lại NOVA CINEMA!`,
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser((prev) => ({ ...prev, role: 'client' }));
    navigateTo('home');
    showNotification({
      type: 'info',
      title: 'Đã đăng xuất',
      message: 'Hẹn gặp lại quý khách tại các suất chiếu tiếp theo!',
    });
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...profile }));
    showNotification({
      type: 'success',
      title: 'Cập nhật thành công',
      message: 'Thông tin hồ sơ cá nhân đã được lưu an toàn trên hệ thống NOVA.',
    });
  };

  const selectedMovie = movies.find((m) => m.id === selectedMovieId) || movies[0];
  const selectedShowtime = showtimes.find((st) => st.id === selectedShowtimeId) || showtimes[0];

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        if (prev.length >= 8) {
          showNotification({
            type: 'error',
            title: 'Giới hạn số ghế',
            message: 'Mỗi giao dịch tối đa 8 ghế theo chính sách phòng vé VIP.',
          });
          return prev;
        }
        return [...prev, seatId];
      }
    });
  };

  const updateComboQuantity = (comboId: string, quantity: number) => {
    setSelectedCombos((prev) => {
      const copy = { ...prev };
      if (quantity <= 0) {
        delete copy[comboId];
      } else {
        copy[comboId] = quantity;
      }
      return copy;
    });
  };

  const applyVoucherCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VIPGOLD10' || clean === 'NOVALUXURY' || clean === 'PREMIERE20') {
      const discount = clean === 'PREMIERE20' ? 80000 : 50000;
      setAppliedVoucher({ code: clean, discount });
      return { success: true, message: `Áp dụng mã ưu đãi ${clean} thành công (-${discount.toLocaleString('vi-VN')}đ)` };
    }
    return { success: false, message: 'Mã ưu đãi không hợp lệ hoặc đã hết lượt áp dụng.' };
  };

  const clearBookingFlow = () => {
    setSelectedSeats([]);
    setSelectedCombos({});
    setAppliedVoucher(null);
  };

  const startBookingForMovie = (movieId: string) => {
    setSelectedMovieId(movieId);
    const movieShowtimes = showtimes.filter((s) => s.movieId === movieId);
    if (movieShowtimes.length > 0) {
      setSelectedShowtimeId(movieShowtimes[0].id);
    }
    navigateTo('seat-selection', { movieId });
  };

  const startBookingForShowtime = (showtimeId: string) => {
    const st = showtimes.find((s) => s.id === showtimeId);
    if (st) {
      setSelectedShowtimeId(st.id);
      setSelectedMovieId(st.movieId);
      const c = cinemas.find((item) => item.id === st.cinemaId);
      if (c) setSelectedCinema(c);
      setSelectedDate(st.date);
    }
    resetLockTimer();
    navigateTo('seat-selection', { showtimeId });
  };

  const proceedToCheckout = () => {
    if (selectedSeats.length === 0) {
      showNotification({
        type: 'error',
        title: 'Chưa chọn ghế',
        message: 'Vui lòng chọn ít nhất 1 vị trí ghế trước khi thanh toán.',
      });
      return;
    }
    navigateTo('checkout');
  };

  const simulatePaymentSuccess = (paymentMethod: 'momo' | 'vnpay' | 'card' | 'points'): Booking => {
    const randomCode = `NV-${Math.floor(100000 + Math.random() * 900000)}`;
    const seatPrice = selectedShowtime?.priceStandard || 140000;
    const subtotalSeats = selectedSeats.length * seatPrice;
    let subtotalCombos = 0;
    const comboList: { comboId: string; name: string; quantity: number; price: number }[] = [];

    Object.entries(selectedCombos).forEach(([comboId, qty]) => {
      const c = COMBOS.find((item) => item.id === comboId);
      if (c && qty > 0) {
        subtotalCombos += c.price * qty;
        comboList.push({ comboId: c.id, name: c.name, quantity: qty, price: c.price });
      }
    });

    const subtotal = subtotalSeats + subtotalCombos;
    const discount = appliedVoucher?.discount || 0;
    const total = Math.max(0, subtotal - discount);

    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      bookingCode: randomCode,
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      moviePoster: selectedMovie.posterUrl,
      movieFormat: selectedShowtime?.format || 'IMAX Laser GT',
      cinemaId: selectedCinema.id,
      cinemaName: selectedCinema.name,
      hallName: selectedShowtime?.hallName || 'Hall 01',
      date: selectedDate === '2025-05-18' ? 'Hôm nay, 18/05/2025' : selectedDate,
      time: `${selectedShowtime?.startTime || '19:30'} - ${selectedShowtime?.endTime || '22:16'}`,
      seats: [...selectedSeats],
      combos: comboList,
      subtotal,
      discount,
      total,
      customerName: user.name,
      customerPhone: user.phone,
      customerEmail: user.email,
      paymentMethod,
      status: 'confirmed',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=NOVA-${randomCode}-${user.name.toUpperCase()}-${selectedSeats.join('-')}`,
      createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showNotification({
      type: 'success',
      title: 'Giao dịch thành công',
      message: `Thanh toán thành công! Mã đơn hàng #${randomCode} đã được lưu vào mục Vé của tôi.`,
    });
    navigateTo('my-tickets');
    return newBooking;
  };

  const cancelBooking = (bookingCode: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingCode === bookingCode ? { ...b, status: 'canceled' } : b))
    );
    showNotification({
      type: 'info',
      title: 'Đã hủy đơn đặt vé',
      message: `Mã vé ${bookingCode} đã được hủy theo chính sách hoàn tiền 100% cho hội viên VIP.`,
    });
  };

  // Admin movie operations
  const adminAddMovie = (newMovieData: Omit<Movie, 'id'>) => {
    const id = newMovieData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const fullMovie: Movie = {
      ...newMovieData,
      id,
    };
    setMovies((prev) => [fullMovie, ...prev]);
    showNotification({
      type: 'success',
      title: 'Đã thêm phim mới',
      message: `Tác phẩm "${newMovieData.title}" đã được lưu vào Kho phim kỹ thuật số DCI.`,
    });
  };

  const adminDeleteMovie = (id: string) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
    showNotification({
      type: 'info',
      title: 'Đã gỡ phim',
      message: 'Tác phẩm đã được chuyển vào lưu trữ.',
    });
  };

  // Admin showtime operations with Conflict Detector (AD04)
  const adminAddShowtime = (
    newSt: Omit<Showtime, 'id'>
  ): { success: boolean; conflictMessage?: string } => {
    // Conflict checking: same cinema, same hall, overlapping time slot (+15m cleanup buffer)
    const newStartMinutes = toMinutes(newSt.startTime);
    const newEndMinutes = toMinutes(newSt.endTime) + 15; // +15 mins buffer

    const conflicting = showtimes.find((existing) => {
      if (existing.cinemaId !== newSt.cinemaId || existing.hallId !== newSt.hallId || existing.date !== newSt.date) {
        return false;
      }
      const existingStart = toMinutes(existing.startTime);
      const existingEnd = toMinutes(existing.endTime) + 15;
      return newStartMinutes < existingEnd && newEndMinutes > existingStart;
    });

    if (conflicting) {
      const conflictMovie = movies.find((m) => m.id === conflicting.movieId)?.title || 'Phim khác';
      return {
        success: false,
        conflictMessage: `Phát hiện xung đột lịch chiếu với suất "${conflictMovie}" (${conflicting.startTime} - ${conflicting.endTime} + 15m dọn dẹp) tại ${conflicting.hallName}.`,
      };
    }

    const created: Showtime = {
      ...newSt,
      id: `st-${Date.now()}`,
    };

    setShowtimes((prev) => [...prev, created]);
    showNotification({
      type: 'success',
      title: 'Tạo suất chiếu thành công',
      message: `Đã xếp lịch chiếu ${created.startTime} tại ${created.hallName} không có xung đột.`,
    });
    return { success: true };
  };

  const adminDeleteShowtime = (id: string) => {
    setShowtimes((prev) => prev.filter((st) => st.id !== id));
    showNotification({
      type: 'info',
      title: 'Đã hủy suất chiếu',
      message: 'Suất chiếu đã được gỡ khỏi hệ thống bán vé trực tuyến.',
    });
  };

  const activeTicket = bookings.find((b) => b.status === 'confirmed') || bookings[0] || null;

  return (
    <CinemaContext.Provider
      value={{
        currentView,
        navigateTo,
        user,
        isLoggedIn,
        login,
        logout,
        updateUserProfile,
        movies,
        showtimes,
        cinemas,
        selectedMovieId,
        selectedShowtimeId,
        selectedMovie,
        selectedCinema,
        selectedDate,
        setSelectedDate,
        selectedShowtime,
        selectedSeats,
        selectedCombos,
        appliedVoucher,
        lockCountdown,
        resetLockTimer,
        toggleSeat,
        updateComboQuantity,
        applyVoucherCode,
        clearBookingFlow,
        startBookingForMovie,
        startBookingForShowtime,
        proceedToCheckout,
        simulatePaymentSuccess,
        bookings,
        activeTicket,
        cancelBooking,
        adminAddMovie,
        adminDeleteMovie,
        adminAddShowtime,
        adminDeleteShowtime,
        notification,
        showNotification,
        clearNotification,
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = () => {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error('useCinema must be used within a CinemaProvider');
  }
  return context;
};

function toMinutes(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}
