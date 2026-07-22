let Category = require('../models/Category')

let getCategory = async (req, res) => {
    let category = await Category.find()
    res.json(category)
}

let AddCategory = async (req, res) => {
    try {
        let newCat = new Category(req.body)
        await newCat.save()

        res.status(201).json(newCat)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}

let DeleteCategory = async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.json(Category)
}

let UpdateCategory = async (req, res) => {
    const UpdatedCat = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(UpdatedCat);
};

module.exports = {
    getCategory, AddCategory, DeleteCategory, UpdateCategory
}