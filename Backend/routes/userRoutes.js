const express = require("express");
const router = express.Router();
const {isAuth}=require("../middleware/isAuth")
const { signUp, Login, Logout, currentUser, updateProfile }=require("../controller/userController")
router.post("/signup",signUp)
router.post("/login",Login)
router.get("/logout", Logout)
router.get("/current", isAuth, currentUser)
router.post("/update", isAuth, updateProfile)

module.exports = router;