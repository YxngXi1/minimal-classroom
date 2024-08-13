import fs from 'fs';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(process.cwd(), 'localhost.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'localhost.crt')),
    },
  },
};

export default nextConfig;
