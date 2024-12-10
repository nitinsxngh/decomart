const cloudinary = require("cloudinary");
require("dotenv").config(); // Load environment variables from .env file

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  try {
    const result = await cloudinary.uploader.upload(fileToUploads, {
      resource_type: "auto", // This automatically detects the file type
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary: " + error.message);
  }
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    const result = await cloudinary.uploader.destroy(fileToDelete, {
      resource_type: "auto",
    });
    return {
      url: result.secure_url,
      asset_id: result.asset_id,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error("Error deleting image from Cloudinary: " + error.message);
  }
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
