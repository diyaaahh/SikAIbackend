const throwError = require("../utils/throwError.js");
const generateStrongPassword = require("../utils/passwordGenerator.js");
const { sendMail } = require("../utils/sendMail.js");
const { HttpStatus, roleEnum } = require("../constant/constants.js");

const User = require("../Models/User.js");
const sendSuccessResponse = require("../helper/apiResponseHandler.js");
const asyncErrorHandler = require("../utils/asyncHandler.js");
const bcrypt = require("bcrypt");

exports.createUser = asyncErrorHandler(async (req, res) => {
  const { name, email, role, phoneNumber, address } = req.body;
  console.log(req.body);

  if (!name || !email || !role) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "All the fields are required",
    });
  }

  if (!roleEnum.includes(role)) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Invalid roles",
    });
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    throwError({
      statusCode: HttpStatus.CONFLICT,
      message: "User already exists",
    });
  }

  const autoGeneratedPassword = generateStrongPassword();

  const mailMessage = {
    from: process.env.email,
    to: email,
    subject: "Welcome to Our Online Learning Management System!",
    html: `
          <p>Hello ${name},</p>
          <p>Welcome to the system! Your account has been created.</p>
          <p>Your autogenerated password is: <b>${autoGeneratedPassword}</b> </p>
          <p>Please make sure to change your password after logging in for the first time.</p>
          <p>Thank you!</p>
        `,
  };

  const user = new User({
    name,
    email,
    role,
    password: autoGeneratedPassword,
    phoneNumber,
    address,
  });
  await user.save();

  await sendMail(mailMessage);

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.CREATED,
    message: "User is created successfully",
  });
});

exports.getAllUsers = asyncErrorHandler(async (req, res) => {
  const users = await User.find({}, { password: false }).sort({
    createdAt: -1,
  });

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "All users data has been retrieved",
    data: users,
  });
});

exports.userLogin = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    throwError({
      message: "All the fields are required",
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      message: "User not found",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }

  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    throwError({
      message: "Wrong password, please check your password",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  user.password = null;
  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: `Authentication successful, Welcome ${user.name}`,
    data: user
  });
});

exports.changePassword = asyncErrorHandler(async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  const passwordMatch = await bcrypt.compare(oldPassword, user.password);

  // if (!passwordMatch) {
  //   throwError({
  //     statusCode: HttpStatus.BAD_REQUEST,
  //     message: "Incorrect old password.",
  //   });
  // }

  user.password = newPassword;
  await user.save();

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "Password is changed successfully",
  });
});

exports.deleteUser = asyncErrorHandler(async (req, res) => {
  const email = req.params.email;

  if (!email) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Email is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  await User.deleteOne({ email });

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "User deleted successfully",
  });
});

exports.updateUser = asyncErrorHandler(async (req, res) => {
  const email = req.params.email;
  const { updatedData } = req.body;

  if (!email || !updatedData) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Email or updated data is required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  Object.assign(user, updatedData);
  const newUserData = await user.save();

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "User updated successfully",
    data: {
      name: newUserData.name,
      email: newUserData.email,
      phoneNumber: newUserData.phoneNumber,
      address: newUserData.address,
    },
  });
});

exports.getAllStudentEmails = async () => {
  try {
    const students = await User.find({ role: "student" }).select("email");

    if (!students || students.length === 0) {
      throwError({
        statusCode: HttpStatus.NOT_FOUND,
        message: "No students found",
      });
    }

    const studentEmails = students.map((student) => student.email);

    return studentEmails;
  } catch (error) {
    return [];
  }
};
