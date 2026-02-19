import express from "express";
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrderDetail, updateOrderStatus } from "../controllers/orderController.js";
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js";
const orderRouter = express.Router();

orderRouter.post("/new-order", isAuthenticatedUser, createOrder)
orderRouter.get("/order-detail/:id", isAuthenticatedUser, isAdmin("admin"), getSingleOrder)
orderRouter.get("/my-order", isAuthenticatedUser, myOrderDetail)
orderRouter.get("/get-all-orders", isAuthenticatedUser, isAdmin("admin"), getAllOrders);
orderRouter.put("/update-order-status/:id", isAuthenticatedUser, isAdmin("admin"), updateOrderStatus)
orderRouter.delete("/delete-order/:id", isAuthenticatedUser, isAdmin("admin"), deleteOrder)

export default orderRouter