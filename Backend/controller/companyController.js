const Company=require("../models/companyModel")
exports.registerCompany = async (req, res) => {
   
    try {
        let { name } = req.body
       // console.log(name);
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "company name is filled",
            })
        }
        let company = await Company.findOne({ name }) 
        
        if (company) {
            return res.status(400).json({
                success: false,
                message: "you can't register same company",
            })
        }
         company = await Company.create({
            name:name,
        })
       // console.log(company);
        return res.status(200).json({
            success: true,
            message: "company created successfully",
            company,
        })
   } 
      catch (error) {
          return res.status(500).json({
              success: false,
              message:"company is not created",
          })
      }  
    
}


exports.getCompany = async (req, res) => {
    try {
        const userId = req.user.id;
        const companies = await Company.find({})
        if (!companies) {
            return res.status(400).json({
                success: false,
                message: "companies not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "find all companies",
            companies,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "company not found",
        })
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById( companyId );
        if (!company) {
            return res.status(400).json({
                success: false,
                message: "company not found",
            })
        }
        return res.status(200).json({
            success: true,
            message: "find company successfully",
            company,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "company not found",
        })
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })
        if (!company) {
            return res.status(400).json({
                success: false,
                message: "company is not register",
            })
        }
        return res.status(200).json({
            success: true,
            message: "company is update successfully",
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "company not update",
        })
    }
}