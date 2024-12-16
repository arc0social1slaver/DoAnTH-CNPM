require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))


app.use("/api/products", require("./src/products/products.route"))
app.use("/api/users", require("./src/users/users.route"))
app.use("/api/categories", require("./src/categories/categories.route"))

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