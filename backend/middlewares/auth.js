const userModel = require("../models/userSchema");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { ErrorHandler } = require("../middlewares/errorMiddleware");
const jwt = require("jsonwebtoken");

const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const user = await userModel.findByPk(decoded.id);

    if (!user) {
        return next(new ErrorHandler("Admin Not Found", 404));
    }

    if (user.role !== "Admin") {
        return next(new ErrorHandler(`${user.role} not authorized for this resource!`, 403));
    }

    req.user = user;
    next();
});

const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await userModel.findByPk(decoded.id);

    if (!user) {
        return next(new ErrorHandler("Patient Not Found", 404));
    }

    if (user.role !== "Patient") {
        return next(new ErrorHandler(`${user.role} not authorized for this resource`, 403));
    }
    

    req.user = user;
    next();
});

module.exports = { isAdminAuthenticated, isPatientAuthenticated };
