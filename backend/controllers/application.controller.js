import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

/* ================= APPLY JOB ================= */
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required.",
        success: false,
      });
    }

    // check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    // check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // create application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // push into job
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
      application: newApplication,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while applying for job.",
      success: false,
    });
  }
};


/* ================= GET APPLIED JOBS ================= */
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (application.length === 0) {
      return res.status(404).json({
        message: "No Applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch applied jobs.",
      success: false,
    });
  }
};


/* ================= GET APPLICANTS ================= */
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to load applicants.",
      success: false,
    });
  }
};


/* ================= UPDATE STATUS ================= */
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Status update failed.",
      success: false,
    });
  }
};
