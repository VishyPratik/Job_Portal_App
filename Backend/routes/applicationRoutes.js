const express = require("express");
const router = express.Router();
const {isAuth}=require("../middleware/isAuth")
const {applyJob,getAppliedJobs,getApplicants,updateApplicationStatus} = require("../controller/applicationController");
router.post("/apply/:id", isAuth, applyJob);
router.get("/applied", isAuth, getAppliedJobs);
router.get("/applicants/:id", isAuth, getApplicants);
router.put("/status/:id", isAuth, updateApplicationStatus);

module.exports = router;