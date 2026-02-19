import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        // console.log(token);
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Plz Login First"  
            })
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decodedData);

        req.user = await User.findById(decodedData.id)
        next()

    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const isAdmin = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(400).json({
                success : false,
                message  : "You cannot access this route"
            })
        }
        next()
    }
}