const jwt = require("jsonwebtoken");

let verifytoken = (req, res, next) => {

    const authHeader = req.headers.authorization;
    // console.log("Authorization:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header missing"
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Token missing"
        });
    }

    jwt.verify(token, process.env.JWT_secret, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        // console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    });

};

module.exports = verifytoken;