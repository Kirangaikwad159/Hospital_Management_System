const Appointment = require('../models/appointmentSchema');
const User = require('../models/userSchema');
const { ErrorHandler } = require("../middlewares/errorMiddleware");
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address 
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const doctorList = await User.findAll({
    where: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    }
  });

  if (doctorList.length === 0) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }

  if (doctorList.length > 1) {
    return next(
      new ErrorHandler(
        "Multiple Doctors Found! Please Contact Through Email or Phone.",
        400
      )
    );
  }

  const doctorId = doctorList[0].id;
  const patientId = req.user.id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctorFirstName: doctor_firstName,
    doctorLastName: doctor_lastName,
    hasVisited,
    address,
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment Sent Successfully!",
    appointment,
  });
});



const getAllAppointments = catchAsyncErrors(async (req, res, next) => {

  const appointments = await Appointment.findAll();

  res.status(200).json({
    success: true,
    appointments,
  });
});


const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await userModel.findAll({
    where: { role: "Doctor" }
  });

  res.status(200).json({
    success: true,
    doctors
  });
});



const updateAppointmentStatus = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not Found", 404));
    }

    await appointment.update(req.body);

    res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
        appointment,
    });
});


const deleteAppointment = catchAsyncErrors (async (req, res, next) => {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }

    await appointment.destroy();

    res.status(200).json({
        success: true,
        message: "Appointment Deleted Successfully",
    });
});

module.exports = {
  postAppointment,
  getAllAppointments,
  getAllDoctors,
  updateAppointmentStatus,
  deleteAppointment
};
