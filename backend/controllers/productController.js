const Product = require("../models/productModel");

//create product -- admin 
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

exports.getAllProducts = async (req, res) => {
    const product = await Product.find()
    res.status(200).json({
        message: "Success",
        product
    })
}

//update product --admin
exports.updateProduct = async (req, res) => {

    let product = await Product.findById(req.params.id)

    if (!product) {

        return res.status(500).json({
            success: false,
            message: "product not found"
        })
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

//delete a product

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: "Product not found"
            });
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
};
