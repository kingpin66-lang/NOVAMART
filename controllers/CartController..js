const Cart = require('../models/Cart')


let getCart = async (req, res) => {
    let cart = await Cart.find(
        { user: req.user.id }
    ).populate("product")
    res.json(cart)
}

let addCart = async (req, res) => {

    const { product, quantity } = req.body;

    let cart = await Cart.findOne({
        user: req.user.id,
        product
    });

    if (cart) {
        cart.quantity += quantity;

        await cart.save();

        return res.json(cart);
    }

    cart = new Cart({
        user: req.user.id,
        product,
        quantity
    });

    await cart.save();

    res.status(201).json(cart);
}

let deleteCart = async (req, res) => {
    let del = await Cart.findByIdAndDelete(req.params.id)
    res.json('deleted')
}

let clearCart = async (req, res) => {
    let clear = await Cart.deleteMany({
        user: req.user.id
    })
    res.json('deleted')
}

let updateCart = async (req, res) => {

    const cart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    );

    res.json(cart);

}

module.exports = {
    getCart, addCart, deleteCart, clearCart, updateCart
}