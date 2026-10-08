const express = require("express");
const router = express.Router();
const {isAuth}=require("../middleware/isAuth")
const { postJob, getAllJobs, getJobById, createAdmin }=require("../controller/jobController")
router.post("/jobPost", isAuth, postJob)
router.get("/getAllJob", isAuth, getAllJobs)
router.get("/getJob/:id", isAuth, getJobById)
router.get("/getAdminJob", isAuth, createAdmin )

module.exports = router;