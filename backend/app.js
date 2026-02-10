const express  = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const messageRoute = require('./routes/MessageRoute');
const userRoute = require('./routes/userRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const { errorMiddleware } = require("./middlewares/errorMiddleware");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
  "http://localhost:3000",
  "http://localhost:3001"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

app.use('/api/v1/message', messageRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/appointment', appointmentRoute);

app.use(errorMiddleware);

module.exports = app;
