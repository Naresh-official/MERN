import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function uploadToCloudinary(buffer) {
    try {
        const uploadResult = await new Promise((resolve) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        resource_type: "auto",
                        folder: "Instagram",
                        chunk_size: 10000000,
                    },
                    (error, uploadResult) => {
                        return resolve(uploadResult);
                    }
                )
                .end(buffer);
        });
        return uploadResult.url;
    } catch (error) {
        console.log(error);
        return new Error("Failed to upload image to cloudinary : ", error);
    }
}
