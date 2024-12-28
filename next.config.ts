module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false, // Temporary redirect
      },
    ];
  },
};
