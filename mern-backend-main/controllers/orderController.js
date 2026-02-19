
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, taxPrice, shippingCost, totalPrice, orderStatus } = req.body;

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            taxPrice,
            shippingCost,
            totalPrice,
            orderStatus,
            user: req.user.id,
            paidAt: Date.now()
        })

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        return res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const myOrderDetail = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "order not found"
            })
        }

        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Orders not found"
            })
        }
        let total = 0
        orders.forEach((order) => {
            // total += order.totalPrice
            total = total + order.totalPrice
        })

        return res.status(200).json({
            success: true,
            orders,
            total
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.orderStatus = req.body.status
        await Promise.all(order.orderItems.map(item => updateStock(item.product, item.quantity)))
        await order.save({ runValidators: false })
        return res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error
        })
    }
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    if (!product) {
        return new Error("Product not found")
    }

    // product.stocks = product.stocks - quantity;
    product.stock -= quantity
    await product.save({ runValidators: false })
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        if (order.orderStatus !== "Delivered") {
            return res.status(400).json({
                success: false,
                message: "You cannot delete this order, its under processing"
            })
        }

        await Order.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error
        })
    }
}