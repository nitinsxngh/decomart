const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push(newpath);
      fs.unlinkSync(path); // Deleting the local file after uploading
    }

    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error uploading images: " + error.message });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image: " + error.message });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
