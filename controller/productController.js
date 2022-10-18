const multer = require("multer");
const Product = require("../Model/product");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");
const { CustomErrorHandler } = require("../services/customErrorHandler");
const { productScheme } = require("../validators/productValid");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    // 3746674586-836534453.png
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); // 5mb

const productController = {
  async store(req, res, next) {
    // Multipart form data

    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.servererror(err.message));
      }
      const filePath = req.file.path.replace("\\", "/");
      // validation

      const { error } = productScheme.validate(req.body);
      if (error) {
        // Delete the uploaded file
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            console.log(err);
            return next(CustomErrorHandler.servererror(err.message));
          }
        });

        return next(error);
        // rootfolder/uploads/filename.png
      }
      console.log(req.body);
      const { name, price, size } = req.body;

      let document;
      try {
        document = await Product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },
  async update(req, res, next) {
    // Multipart form data

    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomErrorHandler.servererror(err.message));
      }
      let filePath;
      if (req.file) {
        filePath = req.file.path;
      }
      // validation

      // const { error } = productScheme.validate(req.body);
      // if (error) {
      //   // Delete the uploaded file
      //   if (req.file) {
      //     fs.unlink(`${appRoot}/${filePath}`, (err) => {
      //       if (err) {
      //         console.log(err);
      //         return next(CustomErrorHandler.servererror(err.message));
      //       }
      //     });
      //   }

      //   return next(error);
      //   // rootfolder/uploads/filename.png
      // }
      console.log(req.body);
      const { name, price, size } = req.body;

      let document;
      try {
        document = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            name,
            price,
            size,
            ...(req.file && { image: filePath }),
          },
          { new: true }
        );
        console.log(document);
      } catch (err) {
        return next(err);
      }
      res.status(201).json(document);
    });
  },
  async delete(req, res, next) {
    const doc = await Product.findOneAndRemove({ _id: req.params.id });
    if (!doc) {
      return next(new Error("Nothing to delete"));
    }
    const imagePath = doc._doc.image;
    fs.unlink(`${appRoot}/${imagePath}`, (err) => {
      if (err) {
        return next(CustomErrorHandler.servererror());
      }
    });
    res.json(doc);
  },
  async products(req, res, next) {
    let documents;
    try {
      documents = await Product.find().select("-__v").sort({ _id: -1 });
    } catch (error) {
      return next(CustomErrorHandler.servererror());
    }

    return res.json({ documents });
  },
  async fetchPro(req, res, next) {
    let doc;
    try {
      doc = await Product.findOne({ _id: req.params.id }).select("-__v");
      res.json({ doc });
    } catch (error) {
      return next(CustomErrorHandler.servererror());
    }
  },
};

module.exports = { productController };
