import User from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "1",
        url: "gsdhjs",
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not created",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password cannot be empty",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const userProfileController = async (req, res) => {
  try {

    return res.status(200).json({
      success: true,
      user : req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const deleteProfileController = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    user = await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
// npm i cookie-parser

export const resetPasswordRequestController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let resetToken = user.getResetPasswordToken();
    console.log(resetToken);
    user.save({ validatorsBeforeSave: false });

    const resetPasswordUrl = `http://localhost:5173/reset-password/${resetToken}`;
    const message = `If you want to reset you password click on the above link ${resetPasswordUrl}`;

    console.log(resetPasswordUrl);
    console.log(message);

    await sendEmail({
      email: user.email,
      subject: "Reset Password Request",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent successfully to ${user.email}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    console.log(req.params.token);
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is inavlid or has been expired",
      });
    }

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password doesnt match to each other",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Both password doesnt match with each other",
      });
    }

    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error,
    });
  }
};
