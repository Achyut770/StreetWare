import { v2 as cloud } from 'cloudinary';
cloud.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

export default cloud