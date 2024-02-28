const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { promisify } = require("util");

const userModel = require("../model/user.model");
const handlerAsync = require("../middleware/handlerAsync");

const transporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
};

exports.register = handlerAsync(async (req, res, next) => {
  const userFound = await userModel.findOne({ email: req.body.email });
  if (userFound) return next(new Error("user Already Exist"));

  const passwordHashed = await bcrypt.hash(req.body.password, 12);

  registerUser = await userModel.create({
    email: req.body.email,
    userName: req.body.userName,
    password: passwordHashed,
    address: req.body.address,
  });
  console.log(registerUser);
  const token = registerUser.createTokenForVerify();
  //send Email to Verify

  const transport = transporter();
  let messageInfo = await transport.sendMail({
    from: "ecommerce@gmail.com",
    to: registerUser.email,
    subject: "Verificaiton Email",
    html: `<a href='localhost:3000/verify/${token}'>Verify Your Account</a>`,
  });

  res.status(201).json({
    message:
      "You Register Succesfully, Check Your Inbox to verify Your Account",
    messageInfo: messageInfo.messageId,
  });
});

exports.verifyAccount = handlerAsync(async (req, res, next) => {
  const token = req.params.token;
  const user = await userModel.findOne({ emailVerified: token });
  if (!user) return next(new Error("Token Invalid"));

  await userModel.findOneAndUpdate(
    {
      emailVerified: token,
    },
    {
      emailVerified: "",
      isVerified: true,
    },
    { new: true }
  );

  if (user) {
    res.status(200).json({
      Message: "Your Account is Veiried 🎉",
    });
  }
});

exports.login = handlerAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //check if Found this Email
  const user = await userModel
    .findOne({ email, isVerified: true })
    .select("+password");
  const hashed = await bcrypt.compare(password, user.password);
  if (!hashed) {
    const err = new Error("Password Or Email is Invalid");
    return next(err);
  }

  //create token for user
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECERT);

  //remove attribute from output
  user.password = undefined;

  res.status(200).json({
    message: "User LogIn Successfully...👏",
    token,
    user,
  });
});

exports.forgetPassword = handlerAsync(async (req, res, next) => {
  //check if email exist or not
  const { email } = req.body;
  const foundUser = await userModel.findOne({ email });
  if (!foundUser) return next(new Error("Invalid Data"));
  //send email with token to reset password
  const transport = transporter();
  const token = crypto.randomBytes(32).toString("hex");

  await userModel.findByIdAndUpdate(foundUser._id, {
    resetPassword: token,
  });

  let messageInfo = await transport.sendMail({
    from: "ecommerce@gmail.com",
    to: foundUser.email,
    subject: "ForgetPassword",
    html: `<a href='localhost:3000/frontPage/${token}'>Reset Password Now</a>`,
  });

  res.json({
    message: "Email was sent , Check Your Inbox to Reset password",
  });
});

exports.resetPassword = handlerAsync(async (req, res, next) => {
  const token = req.params.token;
  const userFound = await userModel.findOne({ resetPassword: token });
  if (!userFound) return next(new Error("Invalid Token"));

  const hashed = await bcrypt.hash(req.body.password, 10);
  await userModel.findByIdAndUpdate(userFound._id, {
    password: hashed,
  });

  res.status(202).json({
    message: "Password Changed Successfully",
  });
});

exports.auth = handlerAsync(async (req, res, next) => {
  if (!req.headers.authorization) return next(new Error("must be Auth"));
  const token = req.headers.authorization.split(" ")[1];
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECERT);
  const user = await userModel.findById(decode.id);
  req.user = user;
  next();
});

exports.adminOnly = handlerAsync(async (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    next(new Error("This resource available for admin Only"));
  }
});

exports.deAactiveUser = handlerAsync(async (req, res, next) => {
  const userId = req.body.userId;

  await userModel.findByIdAndUpdate(
    userId,
    {
      isActive: false,
    },
    { runValidators: true }
  );

  res.status(202).json({
    message: "User is Inactive Now 😥",
  });
});

exports.updateUser = handlerAsync(async (req, res, next) => {
  //userName , role , Address
  const arrayFieldValid = ["userName", "role", "address", "userId"];
  const validKey = Object.keys(req.body).filter((ele) =>
    arrayFieldValid.includes(ele)
  );
  const obj = {};
  validKey.forEach((ele) => (obj[ele] = req.body[ele]));

  const user = await userModel.findByIdAndUpdate(obj["userId"], obj, {
    new: true,
    runValidators: true
  });
  res.status(202).json({
    message:"User Updated",
    user
  });
});
