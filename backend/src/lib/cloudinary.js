import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './env.js';

// ✅ Debug: check if keys are loaded
console.log('Cloudinary API Key:', ENV.CLOUDINARY_API_KEY);
console.log('Cloudinary Secret:', ENV.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
});

export default cloudinary;
