/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      dangerouslyAllowSVG: true,
      domains: ['res.cloudinary.com', 'cdn2.thecatapi.com', 'firebasestorage.googleapis.com'],
    },
  };
  
  export default nextConfig;
  
  