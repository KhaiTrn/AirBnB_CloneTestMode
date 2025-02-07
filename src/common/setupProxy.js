import { createProxyMiddleware } from("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/users/upload-avatar", {
      target: "https://airbnbnew.cybersoft.edu.vn/api",
      changeOrigin: true,
    })
  );
};
