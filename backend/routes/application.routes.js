import express from 'express';
const router = express.Router();
import isAuthenticated from '../middleware/isAuthenticated.js';
import {Application} from '../models/application.model.js';
import { Job } from '../models/job.model.js';
import { populate } from 'dotenv';

router.post('/apply/:id', isAuthenticated, async(req, res) => {
    try {
        const userId = req.id; //isAuthenticated middleware se
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message: "jobId is required.",
                success: false
            })
        }

        //check if user has already applied for this job
        const existingApplication = await Application.findOne({job : jobId, applicant: userId});
        if(existingApplication){
            return res.status(400).json({
                message: "you have already applied for this job",
                success: false
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message: "job not found.",
                success: false
            })
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

//user kitni jobs(company) me apply kiya h
router.get('/get', isAuthenticated, async(req, res) => {
    try {
        const userId = req.id;

        const application = await Application.find({applicant: userId}).populate({
            path: "job",
            options: {sort:{createdAt: -1}},
            populate:{
                path: "company",
                options: {sort:{createdAt: -1}},
            }
        });

        if(!application){
            return res.status(400).json({
                message: "No Application.",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

//admin dekhega job me kitne user ne apply kia hai
router.get('/:id/applicants', isAuthenticated, async(req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: {sort:{createdAt: -1}},
            populate:{
                path: "applicant"
            }
        })

        if(!job){
            return res.status(400).json({
                message: "job not found.",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.post('/status/:id/update', isAuthenticated, async(req, res) =>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(400).json({
                message: "Application not found.",
                success: false
            })
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

export default router