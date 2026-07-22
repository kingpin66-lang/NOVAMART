let Order = require('../models/Order')
let Cart = require('../models/Cart')

let addOrder = async (req, res) => {
    let cart = await Cart.find({
        user: req.user.id
    }).populate("product")

    if (cart.length === 0) {
        return res.json("Cart is empty")
    }

    let total = 0
    let products = cart.map(a => (
        total += a.product.price * a.quantity,
        {
            product: a.product._id,
            quantity: a.quantity,
            price: a.product.price
        }

    ))

    let order = new Order({
        user: req.user.id,
        products,
        totalprice: total,


    })

    await order.save()

    let deleteCart = Cart.deleteMany({
        user: req.user.id
    }).populate("Product")

    res.status(201).json(order)

}
//all orders
let getOrder = async (req, res) => {
    let order = await Order.find(
        { user: req.user.id }
    ).populate("products.product")

    res.json(order)
}

//admin
let getAllOrders = async (req, res) => {
    const orders = await Order.find()
        .populate("user", "name email")
        .populate("products.product");

    res.json(orders);
}

let getsingleOrder = async (req, res) => {
    let order = await Order.findById(req.params.id)
        .populate("user", "name email")
        .populate("products.product");

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    if (
        order.user._id.toString() !== req.user.id &&
        req.user.role !== "admin"
    ) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    res.json(order);
};

let deleteOrder = async (req, res) => {
    let order = await Order.findById(req.params.id)
    if (order.user.toString() !== req.user.id) {
        return res.json('unauthorzed access')
    }
    if (order.status !== "Pending") {
        return res.json('order cannot be cancelled')
    }
    order.status = "Cancelled"
    order.save()
    res.json(order)
}

let updateOrder = async (req, res) => {
    let update = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
            paymentstatus: req.body.paymentstatus
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.json(update);
}

module.exports = {
    addOrder, getOrder, getsingleOrder, deleteOrder, updateOrder, getAllOrders

}