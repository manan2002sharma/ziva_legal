/** Static export: `next build` writes plain HTML to out/, which any host can serve. */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};
export default nextConfig;
