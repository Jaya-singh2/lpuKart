const express = require("express");
const router = express.Router();
//path is a core module of nodejs
const path = require("path");
const productController = require("../Controller/product");
router.get("/", productController.getAdminPage);
router.get("/addProduct", productController.getAddProductPage);
router.get("/updateProduct", productController.updateProductPage);
router.post("/updateProduct/:ID", productController.updateProduct);
router.get("/updateform/:id", productController.updateForm);
router.post("/product", productController.postAddProductPage);
router.get("/remove/:id", productController.removeStoreData);
module.exports = {
  routes: router,
};

