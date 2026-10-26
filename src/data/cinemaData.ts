export interface CastMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  genres: string[];
  duration: number; // in minutes
  ageRating: 'P' | 'K' | 'T13' | 'T16' | 'T18';
  formats: string[];
  rating: number;
  imdbScore: number;
  reviewsCount: number;
  posterUrl: string;
  bannerUrl: string;
  trailerThumb: string;
  synopsis: string;
  director: string;
  cast: CastMember[];
  releaseDate: string;
  status: 'now-showing' | 'upcoming';
  language: string;
  revenue?: string;
  dciSpecs?: string;
}

export interface Cinema {
  id: string;
  name: string;
  city: 'hcm' | 'hanoi' | 'danang';
  cityName: string;
  address: string;
  phone: string;
  hallsCount: number;
  hallsDesc: string;
  image: string;
  mapEmbed?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  hallId: string;
  hallName: string;
  format: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  priceStandard: number;
  priceVip: number;
  priceSweetbox: number;
  availableSeats: number;
  totalSeats: number;
  status: 'available' | 'low' | 'sold-out' | 'past';
}

export interface ComboItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieFormat: string;
  cinemaId: string;
  cinemaName: string;
  hallName: string;
  date: string;
  time: string;
  seats: string[];
  combos: { comboId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  paymentMethod: 'momo' | 'vnpay' | 'card' | 'points';
  status: 'confirmed' | 'pending' | 'canceled';
  qrCodeUrl: string;
  createdAt: string;
  invoiceRequested?: boolean;
  companyName?: string;
  taxCode?: string;
  companyAddress?: string;
}

export const CINEMAS: Cinema[] = [
  {
    id: 'landmark81',
    name: 'NOVA Landmark 81 VIP',
    city: 'hcm',
    cityName: 'TP. Hồ Chí Minh',
    address: 'Tầng B1 & L2, Vincom Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. HCM',
    phone: '1900 8899 (VIP Concierge)',
    hallsCount: 11,
    hallsDesc: '3 Phòng VIP Flagship • 8 Phòng IMAX Dual Laser',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVyAENq4vFKXjRQr8dl71FWbyc4j7ZNg-h1Bky-CE5H1y3LyojB_vGWFiGyUlugo4-e229jzg6-gRYAGFyJmF_ZAaLKb__ZTpSds1rxqBQJ3wMRsCXLfMX3KzSoebSqgOZPTKWnIt0hclrXLo0-GHhUxG5rWp-7CR4r7Dj1gpqeQJtDjvnQ83cWH36tf-Hcm_YTRLrYGahEIyKHjwkQRmpc_IjlOys_9dGHlIVMCIkAqF0us2gWZO7',
  },
  {
    id: 'westlake',
    name: 'NOVA Westlake Hà Nội',
    city: 'hanoi',
    cityName: 'Hà Nội',
    address: 'Tầng 4 & 5, Lotte Mall West Lake, 272 Võ Chí Công, Tây Hồ, Hà Nội',
    phone: '1900 8898 (Tây Hồ Lounge)',
    hallsCount: 9,
    hallsDesc: '2 Phòng Suite Lounger • 7 Phòng Dolby Atmos 4K',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxNrqXlsjLyj_gxiyv3BYOqYoqq6YmgkCxsaofwhdoeTbixZxKhQckJf8kkXAPWq8x6RcPnz3c87eNVqDPBiEuIFsCXvPYuoXL0jzUSrHwrkqp9RR0dfIDGxEIeXWJQHRl6TdnTM1Y15hz4yYOYvqkR8T6XZ12q19EXaUcjhUYior8JYfFWWDuH2BxDb9IGjXQSA6-Airv8Dw7P8pb6j1aGQ6bPbA1NOOk0bDWUkK3nJw7Ogs57krB',
  },
  {
    id: 'bactrieu',
    name: 'NOVA Vincom Bà Triệu',
    city: 'hanoi',
    cityName: 'Hà Nội',
    address: 'Tầng 6, Tháp B Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội',
    phone: '1900 8897 (Bà Triệu Classic)',
    hallsCount: 8,
    hallsDesc: '4 Phòng VIP Gold • 4 Phòng Laser RGB Digital',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
  },
];

export const MOVIES: Movie[] = [
  {
    id: 'dune-2',
    title: 'Dune: Hành Tinh Cát - Phần Hai',
    originalTitle: 'Dune: Part Two',
    genres: ['Khoa học viễn tưởng', 'Phiêu lưu', 'Hành động'],
    duration: 166,
    ageRating: 'T16',
    formats: ['IMAX Laser GT', 'Dolby Atmos', 'VIP Gold Lounge'],
    rating: 9.3,
    imdbScore: 8.6,
    reviewsCount: 12480,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxNrqXlsjLyj_gxiyv3BYOqYoqq6YmgkCxsaofwhdoeTbixZxKhQckJf8kkXAPWq8x6RcPnz3c87eNVqDPBiEuIFsCXvPYuoXL0jzUSrHwrkqp9RR0dfIDGxEIeXWJQHRl6TdnTM1Y15hz4yYOYvqkR8T6XZ12q19EXaUcjhUYior8JYfFWWDuH2BxDb9IGjXQSA6-Airv8Dw7P8pb6j1aGQ6bPbA1NOOk0bDWUkK3nJw7Ogs57krB',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxNrqXlsjLyj_gxiyv3BYOqYoqq6YmgkCxsaofwhdoeTbixZxKhQckJf8kkXAPWq8x6RcPnz3c87eNVqDPBiEuIFsCXvPYuoXL0jzUSrHwrkqp9RR0dfIDGxEIeXWJQHRl6TdnTM1Y15hz4yYOYvqkR8T6XZ12q19EXaUcjhUYior8JYfFWWDuH2BxDb9IGjXQSA6-Airv8Dw7P8pb6j1aGQ6bPbA1NOOk0bDWUkK3nJw7Ogs57krB',
    synopsis: 'Hành trình vĩ đại tiếp tục khi Paul Atreides hiệp sức cùng Chani và tộc Fremen trên con đường báo thù những kẻ đã hủy hoại gia tộc mình. Đứng trước sự lựa chọn giữa tình yêu của đời mình và số phận của vũ trụ đã được tiên tri, Paul phải ngăn chặn viễn cảnh tương lai tăm tối mà chỉ mình anh có thể thấy trước.',
    director: 'Denis Villeneuve',
    cast: [
      { name: 'Timothée Chalamet', role: 'Paul Atreides', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
      { name: 'Zendaya', role: 'Chani', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92' },
      { name: 'Rebecca Ferguson', role: 'Lady Jessica', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE' },
      { name: 'Austin Butler', role: 'Feyd-Rautha', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNSsfnoc7TiZzEVQ-MRfBUiQaeVX3fXn8vBZJZSRLvKTMCih0sAwFPwpgTEcKYwmOIzyFKzlvr1e9-1VaRL_pj9WJRQck_RPUZ-0WsVU__yso4WUzoDaphXeMxRi7ZTevjHk1OLX0tc6WFtF2ZBXWODDjTLjVoiO6x98-9RPSErjeuAOXGUb3jCkS1l6KcH295bv9p_2GKPAoC61lzltGeX7yNOX6nc1A_90ojmtpAGv5S3Dv6EKL' },
    ],
    releaseDate: '01/03/2024',
    status: 'now-showing',
    language: 'Tiếng Anh - Phụ đề & Lồng tiếng VIP',
    revenue: '42.8 Tỷ VNĐ',
    dciSpecs: 'DCP 4K SMPTE 24fps • Aspect 1.43:1 / 1.90:1 • Dolby Atmos 12.0',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    genres: ['Tiểu sử', 'Tâm lý lịch sử', 'Chính kịch'],
    duration: 180,
    ageRating: 'T18',
    formats: ['IMAX 70mm', 'Dolby Atmos', 'VIP Gold Lounge'],
    rating: 9.4,
    imdbScore: 8.9,
    reviewsCount: 18920,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNSsfnoc7TiZzEVQ-MRfBUiQaeVX3fXn8vBZJZSRLvKTMCih0sAwFPwpgTEcKYwmOIzyFKzlvr1e9-1VaRL_pj9WJRQck_RPUZ-0WsVU__yso4WUzoDaphXeMxRi7ZTevjHk1OLX0tc6WFtF2ZBXWODDjTLjVoiO6x98-9RPSErjeuAOXGUb3jCkS1l6KcH295bv9p_2GKPAoC61lzltGeX7yNOX6nc1A_90ojmtpAGv5S3Dv6EKL',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNSsfnoc7TiZzEVQ-MRfBUiQaeVX3fXn8vBZJZSRLvKTMCih0sAwFPwpgTEcKYwmOIzyFKzlvr1e9-1VaRL_pj9WJRQck_RPUZ-0WsVU__yso4WUzoDaphXeMxRi7ZTevjHk1OLX0tc6WFtF2ZBXWODDjTLjVoiO6x98-9RPSErjeuAOXGUb3jCkS1l6KcH295bv9p_2GKPAoC61lzltGeX7yNOX6nc1A_90ojmtpAGv5S3Dv6EKL',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNSsfnoc7TiZzEVQ-MRfBUiQaeVX3fXn8vBZJZSRLvKTMCih0sAwFPwpgTEcKYwmOIzyFKzlvr1e9-1VaRL_pj9WJRQck_RPUZ-0WsVU__yso4WUzoDaphXeMxRi7ZTevjHk1OLX0tc6WFtF2ZBXWODDjTLjVoiO6x98-9RPSErjeuAOXGUb3jCkS1l6KcH295bv9p_2GKPAoC61lzltGeX7yNOX6nc1A_90ojmtpAGv5S3Dv6EKL',
    synopsis: 'Kiệt tác đoạt 7 giải Oscars của Christopher Nolan, kể về cuộc đời đầy giằng xé của nhà vật lý lý thuyết J. Robert Oppenheimer - người đứng đầu Dự án Manhattan tạo ra quả bom nguyên tử đầu tiên trên thế giới.',
    director: 'Christopher Nolan',
    cast: [
      { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
      { name: 'Emily Blunt', role: 'Katherine Oppenheimer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92' },
      { name: 'Robert Downey Jr.', role: 'Lewis Strauss', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE' },
    ],
    releaseDate: '11/08/2023',
    status: 'now-showing',
    language: 'Tiếng Anh - Phụ đề Việt chuẩn DCI',
    revenue: '38.6 Tỷ VNĐ',
    dciSpecs: 'DCP 4K IMAX 70mm Scan • Aspect 2.20:1 / 1.43:1 • 6-Track Linear PCM',
  },
  {
    id: 'mai',
    title: 'Mai (ĐD Trấn Thành)',
    originalTitle: 'Mai',
    genres: ['Tâm lý', 'Tình cảm', 'Xã hội'],
    duration: 131,
    ageRating: 'T18',
    formats: ['Dolby Atmos', 'VIP Gold Lounge'],
    rating: 8.8,
    imdbScore: 7.8,
    reviewsCount: 31200,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92',
    synopsis: 'Bức tranh xúc động về người phụ nữ tên Mai gần 40 tuổi với những vết thương tâm hồn và nỗ lực mưu sinh, vô tình gặp gỡ Dương - một chàng trai trẻ phóng khoáng, mở ra tình yêu đầy khát khao nhưng đối mặt định kiến gia đình.',
    director: 'Trấn Thành',
    cast: [
      { name: 'Phương Anh Đào', role: 'Mai', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92' },
      { name: 'Tuấn Trần', role: 'Dương (Sâu)', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
      { name: 'Hồng Đào', role: 'Bà Đào', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE' },
    ],
    releaseDate: '10/02/2024',
    status: 'now-showing',
    language: 'Tiếng Việt - Phụ đề Anh',
    revenue: '520 Tỷ VNĐ',
    dciSpecs: 'DCP 4K Scope 2.39:1 • Dolby Atmos 7.1 Master Audio',
  },
  {
    id: 'godzilla-kong',
    title: 'Godzilla x Kong: Đế Chế Mới',
    originalTitle: 'Godzilla x Kong: The New Empire',
    genres: ['Hành động', 'Quái thú', 'Phiêu lưu'],
    duration: 115,
    ageRating: 'T13',
    formats: ['ScreenX 270°', 'IMAX Laser GT', 'Dolby Atmos'],
    rating: 8.5,
    imdbScore: 6.8,
    reviewsCount: 9400,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TbcXT82AfOEi7lVLP2W1UwVyf5DW1Jv50ek0b3GMsG9ydbscyVsjnZNyQ39R91MQXPGEPlf8RHqPNTxW5T6TnxbvNn2yTb9kZdHLtLCqrlCtV7JklCPuOwyNPAUCQynBFlhGcEmYHl3WEqfHAE1qkMHEcza9ksT-55d8QJ_RnaypltVpn0QMMJjwucX8fAvXPyoWzWUHt-T0UQgIhB0Sww4bj41JbVsRT4d7BeCV7S-fyLzG8hq1',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TbcXT82AfOEi7lVLP2W1UwVyf5DW1Jv50ek0b3GMsG9ydbscyVsjnZNyQ39R91MQXPGEPlf8RHqPNTxW5T6TnxbvNn2yTb9kZdHLtLCqrlCtV7JklCPuOwyNPAUCQynBFlhGcEmYHl3WEqfHAE1qkMHEcza9ksT-55d8QJ_RnaypltVpn0QMMJjwucX8fAvXPyoWzWUHt-T0UQgIhB0Sww4bj41JbVsRT4d7BeCV7S-fyLzG8hq1',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2TbcXT82AfOEi7lVLP2W1UwVyf5DW1Jv50ek0b3GMsG9ydbscyVsjnZNyQ39R91MQXPGEPlf8RHqPNTxW5T6TnxbvNn2yTb9kZdHLtLCqrlCtV7JklCPuOwyNPAUCQynBFlhGcEmYHl3WEqfHAE1qkMHEcza9ksT-55d8QJ_RnaypltVpn0QMMJjwucX8fAvXPyoWzWUHt-T0UQgIhB0Sww4bj41JbVsRT4d7BeCV7S-fyLzG8hq1',
    synopsis: 'Sau cuộc chiến nảy lửa ở phần trước, Godzilla và Kong buộc phải gạt bỏ hiềm khích cá nhân để liên minh chống lại mối hiểm họa khổng lồ ẩn giấu nơi Trái Đất Rỗng - Skar King và quái thú băng giá Shimo.',
    director: 'Adam Wingard',
    cast: [
      { name: 'Rebecca Hall', role: 'Dr. Ilene Andrews', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE' },
      { name: 'Dan Stevens', role: 'Trapper', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
    ],
    releaseDate: '29/03/2024',
    status: 'now-showing',
    language: 'Tiếng Anh - Phụ đề & Lồng tiếng',
    revenue: '31.2 Tỷ VNĐ',
    dciSpecs: 'DCP 4K ScreenX Panoramic 270° • Atmos Immersion Sound',
  },
  {
    id: 'despicable-me-4',
    title: 'Kẻ Trộm Mặt Trăng 4',
    originalTitle: 'Despicable Me 4',
    genres: ['Hoạt hình', 'Hài hước', 'Gia đình'],
    duration: 96,
    ageRating: 'P',
    formats: ['VIP Gold Lounge', 'Dolby Atmos', 'ScreenX 270°'],
    rating: 8.9,
    imdbScore: 7.2,
    reviewsCount: 5200,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoPmnTZKYwf83FQE8s1ykm3_e5_A2Wd4uPMEabRGfqHeTMEL5Yy-VyAuHBVR7N9d0lpowg3xhw7--DwkZZFHY9qx14Q9Wc6_2OJrP2ShZlCJlnPduDknK3Fn8MnKsokrVFu6o2lkzGjP-nTLsjGKpOaRxql8vs8GP_g3RlnNWZPBMiQ3nscMrtQ3u3HTl6atbSzEd_gIzYAzotr95I4kimfn38hZmGD62izW4rki7GIcKJnzvcGKjx',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoPmnTZKYwf83FQE8s1ykm3_e5_A2Wd4uPMEabRGfqHeTMEL5Yy-VyAuHBVR7N9d0lpowg3xhw7--DwkZZFHY9qx14Q9Wc6_2OJrP2ShZlCJlnPduDknK3Fn8MnKsokrVFu6o2lkzGjP-nTLsjGKpOaRxql8vs8GP_g3RlnNWZPBMiQ3nscMrtQ3u3HTl6atbSzEd_gIzYAzotr95I4kimfn38hZmGD62izW4rki7GIcKJnzvcGKjx',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoPmnTZKYwf83FQE8s1ykm3_e5_A2Wd4uPMEabRGfqHeTMEL5Yy-VyAuHBVR7N9d0lpowg3xhw7--DwkZZFHY9qx14Q9Wc6_2OJrP2ShZlCJlnPduDknK3Fn8MnKsokrVFu6o2lkzGjP-nTLsjGKpOaRxql8vs8GP_g3RlnNWZPBMiQ3nscMrtQ3u3HTl6atbSzEd_gIzYAzotr95I4kimfn38hZmGD62izW4rki7GIcKJnzvcGKjx',
    synopsis: 'Gru cùng người vợ Lucy và ba cô con gái Margo, Edith, Agnes hào hứng đón chào một thành viên mới: Gru Jr. Tuy nhiên, kỳ nghỉ gia đình êm đềm nhanh chóng bị gián đoạn khi kẻ thù Maxime Le Mal trốn thoát khỏi nhà tù và thề báo thù.',
    director: 'Chris Renaud',
    cast: [
      { name: 'Steve Carell', role: 'Gru', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
      { name: 'Kristen Wiig', role: 'Lucy', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92' },
    ],
    releaseDate: '05/07/2024',
    status: 'upcoming',
    language: 'Lồng tiếng Việt chuẩn Star • Phụ đề EN',
    revenue: 'Mở bán sớm',
    dciSpecs: 'DCP 4K Digital Cinema • Dolby Atmos 5.1/7.1',
  },
  {
    id: 'avatar-3',
    title: 'Avatar 3: Lửa & Tro Tàn',
    originalTitle: 'Avatar: Fire and Ash',
    genres: ['Khoa học viễn tưởng', 'Hành động', 'Sử thi'],
    duration: 190,
    ageRating: 'T13',
    formats: ['IMAX Laser GT', 'Dolby Atmos', 'VIP Gold Lounge'],
    rating: 9.7,
    imdbScore: 9.0,
    reviewsCount: 1540,
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE',
    bannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE',
    trailerThumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwBjhQ9rfxynoPd0nOifuqjbP-t7RmhvC4gB9OGEVPjFs5vylZt_tXogwcxbF64X18cxopyR0Vcem_l2pf1BcnYZMu_oeISbnrajHc3yclBTmbkalszYYmIreyzQ52yhu3J5iOZkDCwfSlW0Tp7oLJ7h1IaPckeTKiInqxnthRzkaO0MH9hr_HrUWlcUmvNpqV0kKSuDiDY06aQIAlvbe9isdY2tLI4zlAXqjGI9BJVWpnCDRurqOE',
    synopsis: 'James Cameron đưa khán giả tái ngộ hành tinh Pandora, khám phá bộ tộc Na\'vi mới đại diện cho nguyên tố Lửa và Tro Tàn (Ash People) - một góc nhìn đen tối và phức tạp hơn về hệ sinh thái Pandora.',
    director: 'James Cameron',
    cast: [
      { name: 'Sam Worthington', role: 'Jake Sully', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPh1KUPgLVM55JAiOxIapm6i6rkP_lwGY_n8Z6LoUP24JuLh6R8BOGcqk9a1Fr-cbLq2N-wkOcwLXOXM8gv4YNC7e2n3v_KD-jCP38UkYQXK3MYrZWOVZ-iJ1I9o6xBbnYLPzKhkHcoqlwA0bZiTm4PFP2bjwJGheK1UPgUPDHtkm_FslmjROPZtcG8pLM697Da5f7QAhUJijwK8kFHB79hoNR2BtEaQ50tv3zoAjiFFXtbolVHgR3' },
      { name: 'Zoe Saldana', role: 'Neytiri', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92' },
    ],
    releaseDate: '19/12/2025',
    status: 'upcoming',
    language: 'Tiếng Anh - 3D HFR High Frame Rate 48fps',
    revenue: 'Dự kiến Q4/2025',
    dciSpecs: 'DCP 4K HFR 48fps • IMAX GT 1.43:1 Laser Dual Head',
  },
];

export const COMBOS: ComboItem[] = [
  {
    id: 'combo-gold',
    name: 'Combo Gold Cinema Luxury',
    description: '1 Bắp Caramel Truffle thượng hạng size L + 2 Nước ngọt tùy chọn + 1 Snack hạt điều cay ngũ vị.',
    price: 185000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVyAENq4vFKXjRQr8dl71FWbyc4j7ZNg-h1Bky-CE5H1y3LyojB_vGWFiGyUlugo4-e229jzg6-gRYAGFyJmF_ZAaLKb__ZTpSds1rxqBQJ3wMRsCXLfMX3KzSoebSqgOZPTKWnIt0hclrXLo0-GHhUxG5rWp-7CR4r7Dj1gpqeQJtDjvnQ83cWH36tf-Hcm_YTRLrYGahEIyKHjwkQRmpc_IjlOys_9dGHlIVMCIkAqF0us2gWZO7',
    tag: 'Bán chạy nhất',
  },
  {
    id: 'combo-champagne',
    name: 'VIP Lounge Moët & Gourmet Canapé',
    description: '1 Ly Champagne Moët & Chandon Brut Impérial + Đĩa Canapé 4 vị phô mai brie, cá hồi xông khói & thịt nguội iberico.',
    price: 450000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxNrqXlsjLyj_gxiyv3BYOqYoqq6YmgkCxsaofwhdoeTbixZxKhQckJf8kkXAPWq8x6RcPnz3c87eNVqDPBiEuIFsCXvPYuoXL0jzUSrHwrkqp9RR0dfIDGxEIeXWJQHRl6TdnTM1Y15hz4yYOYvqkR8T6XZ12q19EXaUcjhUYior8JYfFWWDuH2BxDb9IGjXQSA6-Airv8Dw7P8pb6j1aGQ6bPbA1NOOk0bDWUkK3nJw7Ogs57krB',
    tag: 'Đặc quyền VIP',
  },
  {
    id: 'combo-couple',
    name: 'Sweetbox Duo Deluxe',
    description: '2 Bắp rang bơ phô mai size M + 2 Mocktail bưởi hồng hoa cúc tươi + 1 Hộp socola nghệ nhân Marou.',
    price: 240000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
  },
];

export const INITIAL_SHOWTIMES: Showtime[] = [
  {
    id: 'st-01',
    movieId: 'dune-2',
    cinemaId: 'landmark81',
    hallId: 'hall-01',
    hallName: 'Hall 01 - IMAX Laser GT',
    format: 'IMAX Laser GT',
    date: '2025-05-18',
    startTime: '19:30',
    endTime: '22:16',
    priceStandard: 140000,
    priceVip: 180000,
    priceSweetbox: 320000,
    availableSeats: 32,
    totalSeats: 168,
    status: 'available',
  },
  {
    id: 'st-02',
    movieId: 'dune-2',
    cinemaId: 'landmark81',
    hallId: 'hall-02',
    hallName: 'Hall 02 - VIP Gold Lounge',
    format: 'VIP Gold Lounge',
    date: '2025-05-18',
    startTime: '20:15',
    endTime: '23:01',
    priceStandard: 160000,
    priceVip: 220000,
    priceSweetbox: 380000,
    availableSeats: 6,
    totalSeats: 48,
    status: 'low',
  },
  {
    id: 'st-03',
    movieId: 'oppenheimer',
    cinemaId: 'landmark81',
    hallId: 'hall-01',
    hallName: 'Hall 01 - IMAX Laser GT',
    format: 'IMAX 70mm',
    date: '2025-05-18',
    startTime: '15:45',
    endTime: '18:45',
    priceStandard: 140000,
    priceVip: 180000,
    priceSweetbox: 320000,
    availableSeats: 14,
    totalSeats: 168,
    status: 'available',
  },
  {
    id: 'st-04',
    movieId: 'mai',
    cinemaId: 'landmark81',
    hallId: 'hall-03',
    hallName: 'Hall 03 - Dolby Atmos Prestige',
    format: 'Dolby Atmos',
    date: '2025-05-18',
    startTime: '18:00',
    endTime: '20:11',
    priceStandard: 120000,
    priceVip: 150000,
    priceSweetbox: 280000,
    availableSeats: 48,
    totalSeats: 120,
    status: 'available',
  },
  {
    id: 'st-05',
    movieId: 'godzilla-kong',
    cinemaId: 'landmark81',
    hallId: 'hall-04',
    hallName: 'Hall 04 - ScreenX Panoramic',
    format: 'ScreenX 270°',
    date: '2025-05-18',
    startTime: '21:00',
    endTime: '22:55',
    priceStandard: 130000,
    priceVip: 160000,
    priceSweetbox: 300000,
    availableSeats: 62,
    totalSeats: 140,
    status: 'available',
  },
  {
    id: 'st-06',
    movieId: 'dune-2',
    cinemaId: 'westlake',
    hallId: 'hall-w1',
    hallName: 'Hall 01 - VIP Suite Lounge',
    format: 'VIP Gold Lounge',
    date: '2025-05-18',
    startTime: '19:45',
    endTime: '22:31',
    priceStandard: 150000,
    priceVip: 200000,
    priceSweetbox: 360000,
    availableSeats: 18,
    totalSeats: 56,
    status: 'available',
  },
  {
    id: 'st-07',
    movieId: 'oppenheimer',
    cinemaId: 'westlake',
    hallId: 'hall-w2',
    hallName: 'Hall 02 - Dolby Atmos 4K',
    format: 'Dolby Atmos',
    date: '2025-05-18',
    startTime: '20:30',
    endTime: '23:30',
    priceStandard: 130000,
    priceVip: 170000,
    priceSweetbox: 310000,
    availableSeats: 29,
    totalSeats: 110,
    status: 'available',
  },
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-01',
    bookingCode: 'NV-894215',
    movieId: 'dune-2',
    movieTitle: 'Dune: Hành Tinh Cát - Phần Hai',
    moviePoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCa_LOJOnHza2YutumH1cfUNiZ65iqVzNq91p7_8LnaWu2G_aB45ZQg2CX-Ift-tV-96pglQ55DDwmhizW_YIhWPjCeW6_47XlVIu-8cvKC2CyNZJ49omXXL4Bh85w_9NXhCGIKJ3wljgIIf1LEwXWYuZEAp6sq725BJmLzYzsZ_Kf9hF7EBf7intFh0Kgv29yyhYnTWBd0TbjIQC4YpsLbT_QPNNjgtpHh-YhEZKqp8S5ddxfHz0z',
    movieFormat: 'IMAX Laser GT',
    cinemaId: 'landmark81',
    cinemaName: 'NOVA Landmark 81 VIP',
    hallName: 'Hall 01 - IMAX Laser GT',
    date: 'Hôm nay, 18/05/2025',
    time: '19:30 - 22:16',
    seats: ['F07', 'F08'],
    combos: [
      { comboId: 'combo-gold', name: 'Combo Gold Cinema Luxury', quantity: 1, price: 185000 },
    ],
    subtotal: 545000,
    discount: 54500, // 10% Gold tier discount
    total: 490500,
    customerName: 'Alexandre Nguyen',
    customerPhone: '0908 123 456',
    customerEmail: 'alexandre.nguyen@novacinema.vn',
    paymentMethod: 'momo',
    status: 'confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=NOVA-894215-ALEXANDRE-F07-F08',
    createdAt: '18/05/2025 14:22',
    invoiceRequested: true,
    companyName: 'Công ty Cổ phần Công nghệ & Sáng tạo NOVA',
    taxCode: '0314987654',
    companyAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP. HCM',
  },
  {
    id: 'b-02',
    bookingCode: 'NV-742190',
    movieId: 'oppenheimer',
    movieTitle: 'Oppenheimer (Bản 70mm Scan)',
    moviePoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcNSsfnoc7TiZzEVQ-MRfBUiQaeVX3fXn8vBZJZSRLvKTMCih0sAwFPwpgTEcKYwmOIzyFKzlvr1e9-1VaRL_pj9WJRQck_RPUZ-0WsVU__yso4WUzoDaphXeMxRi7ZTevjHk1OLX0tc6WFtF2ZBXWODDjTLjVoiO6x98-9RPSErjeuAOXGUb3jCkS1l6KcH295bv9p_2GKPAoC61lzltGeX7yNOX6nc1A_90ojmtpAGv5S3Dv6EKL',
    movieFormat: 'IMAX 70mm',
    cinemaId: 'landmark81',
    cinemaName: 'NOVA Landmark 81 VIP',
    hallName: 'Hall 01 - IMAX Laser GT',
    date: '10/05/2025',
    time: '20:00 - 23:00',
    seats: ['G11', 'G12'],
    combos: [],
    subtotal: 360000,
    discount: 36000,
    total: 324000,
    customerName: 'Alexandre Nguyen',
    customerPhone: '0908 123 456',
    customerEmail: 'alexandre.nguyen@novacinema.vn',
    paymentMethod: 'vnpay',
    status: 'confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=NOVA-742190-ALEXANDRE-G11-G12',
    createdAt: '09/05/2025 11:15',
  },
  {
    id: 'b-03',
    bookingCode: 'NV-612984',
    movieId: 'mai',
    movieTitle: 'Mai (ĐD Trấn Thành)',
    moviePoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOC8V32FfCH2DNvQVwwlrxi4GMuo0JnTQXkEmHwXuKUa7VIVhfHRUiNJCN7P5HzDMzVoqERvIYigIN_cZRHuJGVt8uc3ccqTAHyUsCHOKw4ZdvFnT3ANB0eA5LrOuSSfGL0CjmzDqiU6IQwFKlyHT-l6oteUop1lacdjrB00uD0evMyNuasGp0tvI4mIFok-MGX-1ldCozYGQI1ZQ1T9GgtJwUvlTwb6aboSU5AMCjynWxG4uYv92',
    movieFormat: 'Dolby Atmos',
    cinemaId: 'westlake',
    cinemaName: 'NOVA Westlake Hà Nội',
    hallName: 'Hall 02 - Dolby Atmos 4K',
    date: '14/04/2025',
    time: '18:30 - 20:41',
    seats: ['H05', 'H06'],
    combos: [
      { comboId: 'combo-couple', name: 'Sweetbox Duo Deluxe', quantity: 1, price: 240000 },
    ],
    subtotal: 540000,
    discount: 54000,
    total: 486000,
    customerName: 'Alexandre Nguyen',
    customerPhone: '0908 123 456',
    customerEmail: 'alexandre.nguyen@novacinema.vn',
    paymentMethod: 'card',
    status: 'confirmed',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=NOVA-612984-ALEXANDRE-H05-H06',
    createdAt: '14/04/2025 09:30',
  },
];
