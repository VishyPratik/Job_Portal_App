const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();


// SignUp User


exports.signUp = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                success: false,
                message: "All data filled"
            })
        }
        const userExit = await User.findOne({ email });
        if (userExit) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 character"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${fullname}`

        })
        // console.log(user)
        return res.status(200).json({
            success: true,
            message: "User is  registerd successfully",
            user: user,
        })

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not registerd "
        })
    }
}

// Login User



exports.Login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Please all data fullfilled"
            })
        }

        const user = await User.findOne({ email });
        //console.log(userExit);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user does not exits"
            })
        }
        if (user.role !== role) {
            return res.status(400).json({
                success: false,
                message: "you don't have role for access",
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,

            }
            // console.log(payload);
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            // console.log(token);
            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            return res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User is Logged In successfully",
                user: user,
                token: token,
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "password  incorrect"
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User is not logged in"
        })
    }
}


// Logout User

exports.Logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
    }
};


// current user

exports.currentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user is not exits"
            })
        }
        return res.status(200).json({
            success: true,
            message: "find the current user",
            user: user,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "user is not exits"
        })
    }
}

// profile update

exports.updateProfile = async (req, res) => {
    try {

        const { fullname, email, phoneNumber, skills, bio } = req.body;

        let userId = req.user.id;
       // console.log(userId);
        let skillsArray;
        if (skills) {
             skillsArray = skills.split(",");
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (fullname) {
            user.fullname = fullname
       }
        if (email) {
            user.email = email
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber
        }
        if (bio) {
            user.profile.bio = bio
        }

        if (skills) {
            user.profile.skills = skillsArray
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile Update successfully",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "not update profile"
        });
    }
};






