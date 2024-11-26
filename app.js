require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()
const PORT = process.env.PORT || 4000
// -- Section for connecting database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (e) => console.log(e))
.once('open', () => console.log("Connected to the database"))
// -- End section for connecting database

// middlewares
// app.use(express.urlencoded({extended: false}))
// app.use(express.json())

// app.use(session({
//     secret: 'abcdf',
//     saveUninitialized: true,
//     resave: false
// }))
// app.use((req, res, next) => {
//     res.locals.message = req.session.message
//     delete req.session.message
//     next()
// })

// set template engine
app.set("view engine", "ejs")
app.use(express.static("assets"))
// app.set("views", "./")

// route prefix
app.use("", require("./routes/routes"))

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})