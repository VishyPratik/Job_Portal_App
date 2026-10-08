require("dotenv").config();
const express = require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors");
const userRouter = require("./routes/userRoutes")
const companyRouter = require("./routes/companyRoutes")
const jobRouter = require("./routes/jobRoutes")
const applicantRouter = require("./routes/applicationRoutes")
const app = express();
let port = process.env.PORT || 8080;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send("chala ja bsdk ");
})
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/applicant", applicantRouter);
app.listen(port, () => {
    connectDB();
    console.log(`server is start at port ${port}....`)
})