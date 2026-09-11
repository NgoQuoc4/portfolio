import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dguad3xyf',
      api_key: process.env.CLOUDINARY_API_KEY || '931633996125836',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'hxDOyEQKgXP_7XQb8MCDYW3_BSg',
    });
  },
};
