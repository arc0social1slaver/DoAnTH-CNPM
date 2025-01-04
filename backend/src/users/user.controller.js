const user = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { deleteAction, uploadOneFileAction } = require("../middleware/fileHandle");
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
const getUserProfile = async (req, res) => {
    const {id} = req.params;
    try {
        const profile = await user.findById(id ,{
            _id: 0,
            username: 1,
            name: 1,
            sex: 1,
            dob: 1,
            phone: 1,
            email: 1,
            avatar: 1,
        })
        if(!profile) {
            res.status(404).send("Profile not found");
        }
        else {
            res.status(200).send({
                message: "Get profile successfully",
                profile: profile,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get user profile");
    }
}
const editUserProfile = async(req, res) => {
    const {id} = req.params
    try {
        await uploadOneFileAction(req, res)
        const tempProfile = JSON.parse(req.body.user)
        if(!req.file){
            delete tempProfile.avatar
        }
        else {
            tempProfile.avatar = req.file.filename
        }
        const newProfile = await user.findByIdAndUpdate(id, tempProfile)
        if(req.file && newProfile?.avatar) {
            console.log(newProfile.avatar);
            await deleteAction(`./public/${newProfile.avatar}`);
        }
        res.status(200).send({message: "Update user successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Fail to upload file")
    }
    // try {
    //     const profile = await user.findById(id);
    //     if(profile.avatar !== '') {
    //         await deleteAction(req.file?.originalname)
    //     }
    //     else {

    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("Fail to edit user profile");
    // }
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
const setStatusUser = async (req, res) => {
    const {id} = req.params;
    try {
        const changeUser = await user.findById(id)
        await user.updateOne({
            _id: id
        }, {
            $set: {
                isActive: !changeUser.isActive,
            }
        })
        res.status(200).send({
            "message": "Update status successfully",
            "user": changeUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to update user");
    }
}
const removeNormUser = async (req, res) => {
    const {id} = req.params;
    try {
        const inspUser = await user.findById(id)
        if(inspUser.isAdmin === true) {
            res.status(404).send({message: "Unable to delete this user", user: inspUser})
        }
        else {
            const removeUser = await user.findByIdAndDelete(id);
            res.status(200).send({
                message: "Delete user successfully",
                user: removeUser,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to delete user");
    }
}
const searchUserByName = async (req, res) => {
    const {userID, name} = req.params
    try {
        const allNormUser = await user.find({
            _id: {
                $ne: userID
            },
            isAdmin: false,
            username: new RegExp('.*' + name + '.*')
        })
        res.status(200).send({
            message: "Get users successfully",
            users: allNormUser,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get users");
    }
}
module.exports = {
    addUser,
    logInUser,
    getUserProfile,
    getUsers,
    setStatusUser,
    removeNormUser,
    searchUserByName,
    editUserProfile,
}