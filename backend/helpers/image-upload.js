const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require('../db/cloudinary')

const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      let folder = "";
      if (req.baseUrl.includes("users")) {
        folder = "users";
      } else if (req.baseUrl.includes("products")) {
        folder = "products";
      }
  
      return {
        folder: folder, 
        public_id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Nome único para o arquivo
      };
    },
  });

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|webp|jpeg|avif)$/)) {
      return cb(new Error("Por favor, envie apenas imagens nos formatos png, jpg, jpeg, webp ou avif"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };
