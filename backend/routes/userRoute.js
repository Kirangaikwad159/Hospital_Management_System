const express = require('express');
const { patientRegister, login, addNewAdmin, getAllDoctors, getUserDetails, logoutAdmin, logoutPatient, addNewDoctor } = require('../controllers/userController');
const { isAdminAuthenticated, isPatientAuthenticated } = require('../middlewares/auth');
const route = express.Router();

route.post('/patient/register', patientRegister);
route.post('/login', login);
route.post('/admin/addNew', isAdminAuthenticated, addNewAdmin);
route.get('/doctors', getAllDoctors);
route.get('/admin/me', isAdminAuthenticated, getUserDetails);
route.get('/patient/me', isPatientAuthenticated, getUserDetails);
route.get('/admin/logout', isAdminAuthenticated, logoutAdmin);
route.get('/patient/logout', isPatientAuthenticated, logoutPatient);
route.post('/doctor/addnew', isAdminAuthenticated, addNewDoctor);

module.exports = route;
