const express = require('express');
const route = express.Router();
const { postAppointment, getAllAppointments, updateAppointmentStatus, deleteAppointment, getAllDoctors } = require('../controllers/appointmentController');
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { isPatientAuthenticated, isAdminAuthenticated } = require("../middlewares/auth");



route.post('/post', isPatientAuthenticated, postAppointment);
route.get('/getall', isAdminAuthenticated, getAllAppointments);
route.get("/user/doctors", isPatientAuthenticated, getAllDoctors);
route.put('/update/:id', isAdminAuthenticated, updateAppointmentStatus);
route.delete('/delete/:id', isAdminAuthenticated, deleteAppointment);


module.exports = route;
