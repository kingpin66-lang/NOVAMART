const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    products: [{

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            default: 1,

        },
        price:{
            type:Number,
            required:true
        }
    }],
    totalprice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"

    },
    paymentstatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Order",orderSchema)