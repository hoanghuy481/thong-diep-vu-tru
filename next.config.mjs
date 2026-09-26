/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    // Một số môi trường (Docker, WSL, máy ảo, ổ đĩa mạng) không phát sự kiện
    // thay đổi file cho watcher mặc định, khiến "npm run dev" không tự
    // reload khi save. Bật polling bằng cách chạy: WATCH_POLL=true npm run dev
    if (dev && process.env.WATCH_POLL === "true") {
      config.watchOptions = {
        poll: 800,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
