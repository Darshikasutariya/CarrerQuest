import Company from "../models/company.js";
import bcrpt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../utils/generateToken.js";

//Register a new company
export const registerCompany = async(req,res) => {
    
    const {name,email,password} = req.body

    const imageFile = req.file;

    if (!name ||!email ||!password || !imageFile) {
        return res.json({success:false, message:"Missing Details"})
    }

    try{
        const companyExists = await Company.findOne({email })

        if(companyExists){
            return res.json({success:false, message:'Comapny already registered'})
        }

        const salt = await bcrpt.genSalt(10)
        const hashPassword = await bcrpt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const comapny = await Company.create({
            name,
            email,
            password: hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success:true,
            comapny:{
                _id: comapny._id,
                name: comapny.name,
                email: comapny.email,
                image: comapny.image
            },
            token: generateToken(comapny._id)
        })

    }
    catch(error){
        res.json({success:false, message: error.message})
    }
}

//Company log in
export const loginCompany = async(req,res) =>{
    const {email,password} =req.body

    try {
        const company = await Company.findOne({email})

        if (bcrpt.compare(password,company.password)) {
            
            res.json({
                success:true,
                company:{
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else{
            res.json({success:false, message:'Invalid email or password'})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

//Get Comapny data
export const getCompanydata = async(req,res)=>{

}

//Post a new Job
export const postJob = async(req,res) =>{

}

//get company job applicants
export const getComapnyJobApplicants = async(req,res) =>{

}

//Get comapny posted job
export const getCompanyPostedJob = async(req,res) =>{

}

//change job application status
export const ChangeJobApplicationsStatus = async(req,res) =>{

}

//Change jov visibility
export const chnageVisibility = async (req,res) => {
    
}