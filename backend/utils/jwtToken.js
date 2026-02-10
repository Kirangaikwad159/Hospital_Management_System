const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  let cookieName = "userToken";
  if (user.role === "Admin") cookieName = "adminToken";
  if (user.role === "Patient") cookieName = "patientToken";
  if (user.role === "Doctor") cookieName = "doctorToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() +
          process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};

module.exports = generateToken;
