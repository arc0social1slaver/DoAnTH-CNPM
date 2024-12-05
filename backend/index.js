require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 4000

async function main() {
    await mongoose.connect(process.env.DB_URI);
    app.get('/',(req, res) => {
        res.send("Hello world")
    })
}
main().then(() => console.log("Server connected successfully"))
    .catch(err => console.log(err))
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})