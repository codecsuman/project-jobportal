import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


/* ================= REGISTER COMPANY ================= */
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already exists.",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to register company.",
      success: false,
    });
  }
};


/* ================= GET COMPANIES ================= */
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to load companies.",
      success: false,
    });
  }
};


/* ================= GET COMPANY BY ID ================= */
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch company.",
      success: false,
    });
  }
};


/* ================= UPDATE COMPANY ================= */
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    let updateData = { name, description, website, location };

    // Only upload logo if file exists
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company,
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Company update failed.",
      success: false,
    });
  }
};
