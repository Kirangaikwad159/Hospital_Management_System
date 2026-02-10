const express = require('express');
const { sendMessage, getAllMessage } = require('../controllers/messageController');
const { isAdminAuthenticated } = require('../middlewares/auth');
const route = express.Router();


route.post('/send', sendMessage);
route.get('/getall', isAdminAuthenticated, getAllMessage);


module.exports = route;