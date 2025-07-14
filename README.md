# YouTube Clone - Frontend

## 📋 Mô tả dự án

Ứng dụng web YouTube clone được xây dựng bằng React - Nextjs, mô phỏng các tính năng chính của YouTube bao gồm xem video, đăng ký kênh, tạo playlist, bình luận và nhiều tính năng khác.

## ✨ Tính năng chính

### 🔐 Xác thực người dùng
- Đăng ký/Đăng nhập với email
- Đăng nhập bằng Google OAuth
- JWT token authentication
- Protected routes

### 📱 Giao diện chính
- **Home**: Video feed từ kênh đã subscribe
- **Explore**: Khám phá video trending
- **Shorts**: Video ngắn dạng TikTok
- **Subscriptions**: Kênh đã đăng ký
- **Library**: Lịch sử xem, video yêu thích

### 📹 Video Player
- Video player với controls
- Auto-play, loop, speed control
- Fullscreen mode
- Video quality selection
- Captions support

### 👤 Channel Management
- Trang kênh cá nhân
- Upload video
- Quản lý playlist
- Thống kê kênh
- Customize channel

### 💬 Comments & Interactions
- Bình luận và reply
- Like/Dislike video & comment
- Nested comments
- Comment sorting

### 📋 Playlist Features
- Tạo/sửa/xóa playlist
- Thêm video vào playlist
- Public/Private playlist
- Playlist sharing

### 🔔 Notifications
- Real-time notifications
- Like, comment, subscribe alerts
- Notification center

### 🔍 Search & Discovery
- Tìm kiếm video/kênh
- Filter theo category
- Video recommendations
- Trending videos

### 📊 User Features
- Watch history
- Liked videos
- Subscriptions management
- User preferences

## 🛠️ Công nghệ sử dụng

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query + Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: Headless UI + Radix UI
- **Icons**: Lucide React
- **Video Player**: React Player
- **Form Handling**: React Hook Form
- **Validation**: Zod

## 🚀 Cài đặt

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## 🔧 Cấu hình Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Cloudinary (nếu cần)
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```


## 🎨 Design System

- **Colors**: Tailwind CSS color palette
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component library
- **Responsive**: Mobile-first design

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop experience
- Touch-friendly interactions

## 🔒 Bảo mật

- JWT token authentication
- Protected routes
- Input validation
- XSS protection
- CORS handling

## 🚧 Đang cập nhật thêm...
