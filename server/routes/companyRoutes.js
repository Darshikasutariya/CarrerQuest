import express from 'express'
import { ChangeJobApplicationsStatus, chnageVisibility, getComapnyJobApplicants, getCompanydata, getCompanyPostedJob, loginCompany, postJob, registerCompany } from '../controller/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

//Register a Company
router.post('/register',upload.single('image'), registerCompany)

//Company login 
router.post('/login',loginCompany)

//Get company data
router.get('/company',getCompanydata)

//Post a job
router.post('/post-job',postJob)

//Get Applicants Data of Comapny
router.get('/applications',getComapnyJobApplicants)

//Get Company Job list
router.get('/list-jobs',getCompanyPostedJob)

//Change Applications Stutas
router.post('/chnage-status',ChangeJobApplicationsStatus)

//Chnage Aplication Visibility
router.post('/change-visibility',chnageVisibility)

export default router