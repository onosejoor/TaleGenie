"use server";

import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL!;

if (!CLOUDINARY_UPLOAD_PRESET || !CLOUDINARY_URL) {
  throw new Error(
    "CLOUDINARY_URL and CLOUDINARY_UPLOAD_PRESET missing in .env or .env.local file",
  );
}

export default async function uploadImage(file?: File | null) {
  if (!file) return { success: false, image: null };

  if (file?.size > 3 * 1024 * 1024) {
    return { success: false, message: "File size exceeds 2MB" };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const request = await axios.post(CLOUDINARY_URL, formData);
    const result = request.data;

    if (result) {
      return {
        success: true,
        image: result.secure_url,
      };
    }
    return { success: false, message: "An error occurred, try again later" };
  } catch (error: any) {
    console.log("[UPLOAD_IMAGE_ERROR]" + error.message);

    return { success: false, message: error.message };
  }
}
