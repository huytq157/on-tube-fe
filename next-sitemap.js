// next-sitemap.js
module.exports = {
  siteUrl: "https://on-tube.vercel.app/", // Đặt URL trang web của bạn
  generateRobotsTxt: true, // Tạo tệp robots.txt tự động
  sitemapSize: 7000, // Giới hạn kích thước sitemap nếu có quá nhiều URL
  changefreq: "daily", // Tần suất cập nhật các trang
  priority: 0.7, // Độ ưu tiên cho các trang
  generateIndexSitemap: false, // Tạo sitemap cho trang index (không cần thiết nếu bạn đã có sitemap gốc)
};
