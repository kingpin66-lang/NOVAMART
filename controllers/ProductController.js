let Product = require('../models/Product')
let Category = require('../models/Category')
let getProduct = async (req, res) => {
    try {

        const { search, category } = req.query;

        let filter = {};

        // Search by product title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category ID
        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter).populate("category");

        res.json(products);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
let getsingleProduct = async (req, res) => {
    let resp = await Product.findById(req.params.id).populate('category')
    res.json(resp)
}

let AddProduct = async (req, res) => {
    let newProd = new Product({ ...req.body, image: req.file.path })
    await newProd.save()
    await newProd.populate('category')
    res.json(newProd)
}

let DeleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id).populate('category')
    res.json(Product)
}

let UpdateProduct = async (req, res) => {
    let data = { ...req.body }
    if (req.file) {
        data.image = req.file.path
    }
    let updateProd = await Product.findByIdAndUpdate(
        req.params.id, data, { new: true }
    ).populate('category')
    res.json(updateProd)
}

module.exports = {
    getProduct, AddProduct, DeleteProduct, UpdateProduct, getsingleProduct
}