import express from "express";
import { deleteProfileController, resetPasswordRequestController, getAllUsersController, loginUserController, logoutUser, registerUserController, resetPasswordController, updateProfileController, userProfileController, updatePasswordController } from "../controllers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../utils/userAuth.js";
const userRouter = express.Router();

userRouter.post("/register-user", registerUserController);
userRouter.post("/login-user", loginUserController)
userRouter.get("/user-profile", isAuthenticatedUser, userProfileController)
userRouter.put("/update-profile/:id", isAuthenticatedUser, updateProfileController)
userRouter.delete("/delete-profile/:id", isAuthenticatedUser, deleteProfileController)
userRouter.get("/get-all-users", isAdmin("admin"), getAllUsersController);
userRouter.post("/logout-user", isAuthenticatedUser, logoutUser)
userRouter.post("/forgot-password", resetPasswordRequestController)
userRouter.post("/reset-password/:token", resetPasswordController)
userRouter.post("/update-password", isAuthenticatedUser, updatePasswordController)

export default userRouter
