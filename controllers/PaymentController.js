const crypto = require("crypto");
const axios = require("axios");
// const Order = require("../models/Order");

const esewa = async (req, res) => {
    const { amount } = req.body;

    const transaction_uuid = Date.now().toString();
    const productCode = "EPAYTEST";
    const secret = "8gBm/:&EnhH.1/q";

    const message = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;

    const signature = crypto
        .createHmac("sha256", secret)
        .update(message)
        .digest("base64");

    res.json({
        amount,
        transaction_uuid,
        productCode,
        signature,
    });
};

// const verifyEsewa = async (req, res) => {

//     try {

//         const {
//             product_code,
//             total_amount,
//             transaction_uuid
//         } = req.query;

//         const response = await axios.get(
//             `https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`
//         );

//         if (response.data.status === "COMPLETE") {

//             await Order.findOneAndUpdate(
//                 { transaction_uuid },
//                 {
//                     paymentstatus: "Paid",
//                     status: "Processing"
//                 }
//             );

//             return res.json({
//                 message: "Payment Verified"
//             });
//         }

//         res.status(400).json({
//             message: "Payment Failed"
//         });

//     } catch (err) {

//         console.log(err);

//         res.status(500).json({
//             message: "Verification Failed"
//         });

//     }

// };

module.exports = {
    esewa,
    // verifyEsewa
};