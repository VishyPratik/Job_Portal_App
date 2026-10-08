const jwt = require("jsonwebtoken")
require("dotenv").config();
exports.isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token ||
            req.body.token ||
            req.header("Authorization")?.replace("Bearer", "");
       // console.log(token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is mising",
            })
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(decode);
            req.user = decode;
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "token is invalid",
            })
        }
        next();
    }

    catch (error) {
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        })
    }
}