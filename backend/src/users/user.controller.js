const user = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JSON_SEC = process.env.JSON_SECRET;
const addUser = async (req, res) => {
    const {username, email, password} = req.body
    // console.log(username + ' ' + email + ' ' + password);
    try {
        const userAttemp = await user.findOne({email});
        if(userAttemp) {
            return res.status(400).send({"message": "Duplicate User"})
        }
        const newUser = new user({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(200).send({
            message: "Add user successfully",
            user: newUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).send("Fail to add user");
    }
}
const logInUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const userAttemp = await user.findOne({
            email: email,
        });
        if(!userAttemp) {
            return res.status(400).send({"message": "User is not defined"})
        }
        const result = await bcrypt.compare(password, userAttemp.password); 
        if(!result) {
            return res.status(401).send({"message": "Invalid credit"})
        }
        if (userAttemp.isAdmin) {
            const token = jwt.sign({
                id: userAttemp._id,
                username: userAttemp.username,
                isAdmin: userAttemp.isAdmin
            },
            JSON_SEC,
            {
                expiresIn: "1h"
            }
            );
            return res.status(200).send({
                message: "Find user success",
                user: userAttemp,
                token: token
            })
        }
        return res.status(200).send({
            message: "Find user success",
            user: userAttemp
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({"message": "Fail to log in"})
    }
}
const getUsers = async (req, res) => {
    const {userID} = req.params;
    try {
        const normUser = await user.find({
            isAdmin: false,
            _id: {
                $ne: userID
            },
        })
        res.status(200).send({message: "Get user successfully", users: normUser});
    } catch (error) {
        console.error(error);
        res.status(500).send("Fail to get user");
    }
}
module.exports = {
    addUser,
    logInUser,
    getUsers,
}