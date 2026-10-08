const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

exports.applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId= req.user.id;

        
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

       
        const alreadyApplied = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (alreadyApplied) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

       
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            //status: "pending"
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            success: true,
            message: "Job applied successfully",
            newApplication,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.getAppliedJobs = async (req, res) => {
    try {
        const applicantId = req.user.id;

        const applications = await Application.find({
            applicant: applicantId
        })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const applications = await Application.find({
            job: jobId
        })
            .populate("applicant", "-password")
            .populate("job")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


exports.updateApplicationStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;

        
        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        
        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        
        application.status = status;

        await application.save();

        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};