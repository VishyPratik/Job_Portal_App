const express = require("express");
const router = express.Router();
const {isAuth}=require("../middleware/isAuth")
const { registerCompany, getCompany, getCompanyById, updateCompany }=require("../controller/companyController")
router.post("/registerCompany", isAuth, registerCompany)
router.get("/getCompany", isAuth, getCompany)
router.get("/get/:id", isAuth, getCompanyById)
router.put("/update/:id", isAuth, updateCompany )

module.exports = router;