
// require('dotenv').config({path: "backend/.env"})
require('dotenv').config()
if(process.env.REACT_APP_NODE_ENV == "LOCAL"){
    require('dotenv').config({path: "backend/.env"})
}
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')

const authRoute = require('./routes/auth')
const notesRoute = require('./routes/notes')
const geminiRoute = require('./routes/gemini');

// express init
const app = express()

// mongoose init
const dbUrl = process.env.DB_URL

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Database connected");
}
main().catch(err => console.log(err));

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
app.use(cors(corsOptions));
  

// middleware
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send("Visit: https://note-sync-rs.vercel.app/")
})

app.use('/api/auth', authRoute)
app.use('/api/notes', notesRoute)
app.use('/api/gemini', geminiRoute);


// error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).json({success: false, message: err.message}); //For development
})

const port = 8080
app.listen(port, (req, res) => {
    console.log('Listening to the port ' + port);
})
