const Product = require("../Models/productModel");
const Cart = require("../Models/cartModel");
const { body, validationResult } = require('express-validator');
exports.getHomePage = (req, res) => {
  res.render("kartHome");
};
exports.getAddProductPage = (req, res) => {
  res.render("AddProduct", {
    title: "add - product",
    path: "/admin/AddProduct",
  });
};

exports.getAdminPage = (req, res) => {
  res.render("adminHomePage", {
    title: "admin",
    
  });
};
exports.postAddProductPage = (req, res) => {
const {product, name, price, brand, image}=req.body;
const products=new Product({
  product:product,
  name:name,
  price:price,
  brand:brand,
  image:image,
});
body('name').isLength({ min: 5 }),
  // name and product must be at least 5 chars long
body('product').isLength({ min: 5 })
products.save().then((result)=>{
  console.log("data saved");
  res.redirect("/admin/addProduct");
}).catch((err)=>{
  console.log("error");
})
  
};

exports.addInCart = (req,  res) => {
  const id=req.params.Id;
  Product.findById(id).then((result) => {
    const carts=new Cart({
      product:result.product,
      name:result.name,
      price:result.price,
      brand:result.brand,
      image:result.image,
    })
    carts.save().then((result)=>{
      console.log("data saved in cart");
      res.redirect("/user")
    }).catch((err)=>{
      console.log("error");
    })
  });
  
};

exports.showProduct = (req, res) => {
  Product.find({}).then((product) => {
    res.render("store", {
      title: "store display",
      products: product,
    });
  });
};

exports.showCart = (req, res) => {
  Cart.find({}).then((product) => {
    console.log("cart details:", product);
    res.render("cart", {
      title: "store display",
      products: product,
    });
  });
};

exports.removeData = (req, res, next)=>{
  const id=req.params.id;
  Cart.deleteOne({_id:id}).then((result)=>{ 
        console.log("data saved");
        res.redirect("/cart/product");
    });
    
}
exports.fetchProduct = (req, res, next) => {
  const id=req.params.productId;
  Product.findById(id).then((product) => {
    res.render("idProduct", {
      title: "id related product",
      products: product,
    });
  });
  
};
exports.updateProductPage = (req, res, next)=>{
  Product.find({}).then((product) => {
    res.render("updateProduct", {
      title: "store display",
      products: product,
    });
  });

}
exports.updateForm = (req, res, next)=>{
  res.render("UpdateForm", {
    title: "updateform",
    id:req.params.id,
   
  });
}
exports.updateProduct = (req, res, next)=>{
  const id=req.params.ID;
    Product.findByIdAndUpdate({_id:id},{$set:{product:req.body.product, price:req.body.price,brand:req.body.brand}}).then((result)=>{
      result.save().then((result)=>{
        console.log("data saved");
        res.redirect("/admin/updateProduct");
      }).catch((err)=>{
        console.log("error");
      })
    });
    
}

exports.removeStoreData = (req, res, next)=>{
  const id=req.params.id;
  Product.deleteOne({_id:id}).then((result)=>{ 
        console.log("data saved");
        res.redirect("/admin/updateProduct");
    });
    
}


