const Job=require("../models/jobModel")
exports.postJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, experience, location, salary, jobType, position, companyId } = req.body
        if (!title || !description || !experience || !location || !salary || !jobType || !position || !companyId) {
            return res.status(400).json({
                success: false,
                message: "fill all data",
            })
        }
        const job = await Job.create({
            title,
            description,
            location,
            salary,
            jobType,
            position,
            experience,
            company: companyId,
            created_by: userId,
        })
        return res.status(200).json({
            success: true,
            message: "job created successfully",
            job,
        })
    }
    catch (error) {
        console.log("POST JOB ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "job not create",
            error: error.message
        });
    }
}

exports.getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[{
                title : {
                    $regex: keyword,
                    $options: "i"
                }
            },
                {
                    description : {
                        $regex: keyword,
                        $options: "i"
                    }
                }]
        }
        const jobs = await Job.find(query).populate("company").sort({createdAt:-1});
        if (!jobs) {
            return res.status(500).json({
                success: false,
                message: "not found any job",
            })
        }
        return res.status(200).json({
            success: true,
            message: "All jobs fetched successfully",
            jobs
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "not found any job",
        })
    }
}


exports.getJobById = async (req, res) => {
    try {
        let jobId = req.params.id;
        //console.log(jobId);
        const job = await Job.findById(jobId);
        console.log(job);
        if (!job) {
            return res.status(400).json({
                success: false,
                message: "not found any job",
            })
        }
        return res.status(200).json({
            success: true,
            message: "find job by id",
            job,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "not found any job",
        })
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const adminId = req.user.id;
        const jobs = await Job.find({ created_by: adminId }).populate("company")
        if (!jobs) {
            return res.status(400).json({
                success: false,
                message: "job not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "admin create job successfully",
            jobs,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "not create any job",
        })
    }
}