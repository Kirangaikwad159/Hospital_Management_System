class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "SequelizeUniqueConstraintError") {
    message = err.errors[0].message;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message = "Invalid token, please login again";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Token expired, please login again";
    statusCode = 401;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = { ErrorHandler, errorMiddleware };
