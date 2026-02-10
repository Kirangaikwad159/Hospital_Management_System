const generateToken = require("../utils/jwtToken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt =require('jsonwebtoken');
const cloudinary = require('cloudinary');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { ErrorHandler } = require("../middlewares/errorMiddleware");


// const patientRegister = catchAsyncErrors(async (req, res, next) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     password,
//     gender,
//     dob,
//     nic,
//     role
//   } = req.body;

//   if (
//     !firstName ||
//     !lastName ||
//     !email ||
//     !phone ||
//     !password ||
//     !gender ||
//     !dob ||
//     !nic ||
//     !role
//   ) {
//     return next(new ErrorHandler("Please Fill Full Form!", 400));
//   }

//   const existingUser = await userModel.findOne({
//     where: { email }
//   });

//   if (existingUser) {
//     return next(new ErrorHandler("User Already Registered!", 400));
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await userModel.create({
//     firstName,
//     lastName,
//     email,
//     phone,
//     password: hashedPassword,
//     gender,
//     dob,
//     nic,
//     role: "Patient"
//   });
//   generateToken(user, "User Registered!", 200, res);
  
// });


const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // ✅ userModel → User
  const existingUser = await User.findOne({
    where: { email }
  });

  if (existingUser) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ userModel → User
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    gender,
    dob,
    nic,
    role: "Patient"
  });

  // ✅ now user exists
  generateToken(user, "User Registered!", 201, res);
});



const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all details", 400));
  }

  if(password !== confirmPassword){
    return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400))
  }

  const user = await User.findOne({
    where: { email, role }
  });

  if (!user) {
    return next(new ErrorHandler("Invalid Email, Password or Role", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email, Password or Role", 401));
  }

  if (role !== user.role){
    return next(new ErrorHandler("User with This Role Not Found", 400));
  }
  generateToken(user, "User Login Successfully!",200,res)
  // res.status(200).json({
  //   success: true,
  //   message: "User Logged In Successfully!",
  // })
  
});


const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ where: { email } });
    if (isRegistered) {
      return next(new ErrorHandler("Admin with this Email Already Exists!", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      dob,
      nic,
      role: "Admin",
    });

    res.status(201).json({
      success: true,
      message: "New Admin Registered Successfully",
    });
  });


const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.findAll({
      where: { role: "Doctor" },
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({
      success: true,
      doctors
    })
});
 

// const getUserDetails = catchAsyncErrors(async (req, res, next) => {
//   const doctors = await User.findAll({
//     where: { role: "Doctor" }
//   });

//   res.status(200).json({
//     success: true,
//     doctors,
//   });
// });


const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    user,
  });
});

const logoutAdmin = catchAsyncErrors (async (req, res, next) => {
    res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()), 
      })
      .json({
        success: true,
        message: "Admin logged out successfully",
      });
  })

const logoutPatient = catchAsyncErrors (async (req, res, next) => {
    res
      .status(200)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()), 
      })
      .json({
        success: true,
        message: "User logged out successfully!",
      });
    next(error);
  })


const addNewDoctor = catchAsyncErrors (async (req, res, next) => {
    if (!req.files || !req.files.docAvatar) {
      return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }

    const { docAvatar } = req.files;

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(docAvatar.mimetype)) {
      return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !nic ||
      !doctorDepartment
    ) {
      return next(new ErrorHandler("Please Provide Full Details", 400));
    }

    const isRegistered = await User.findOne({ where: { email } });

    if (isRegistered) {
      return next(
        new ErrorHandler(
          `${isRegistered.role} already registered with this email`,
          400
        )
      );
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      docAvatar.tempFilePath
    );

    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      dob,
      nic,
      doctorDepartment,
      role: "Doctor",
      docAvatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "New Doctor Registered!",
      doctor,
    });
  })


module.exports = {
    patientRegister,
    login,
    addNewAdmin,
    getAllDoctors,
    getUserDetails,
    logoutAdmin,
    logoutPatient,
    addNewDoctor
};
