const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeature = require("../utils/apifeature");

//create product -- admin 
exports.createProduct = catchAsyncError( async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}
)

exports.getAllProducts = catchAsyncError(async (req, res) => {
    
    const apiFeature = new Apifeature(Product.find(),req.query).search();
    const product = await apiFeature.query;
    res.status(200).json({
        message: "Success",
        product
    })
}
)

//update product --admin
exports.updateProduct = catchAsyncError(async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new Errorhandler("product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true, 
        useFindAndModify: false
    })
    res.status(200).json({
        success:true,
        product
    })

}
)

//delete a product

exports.deleteProduct = catchAsyncError(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return next(new Errorhandler("product not found",404))
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product"
        });
    }
}
)

exports.getProductDetails = catchAsyncError(async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return next(new Errorhandler("product not found",404))
        }
    
    
        res.status(200).json({
            success: true,
            product
        });
        
    } catch (error) {
        console.log(error)
    }
})