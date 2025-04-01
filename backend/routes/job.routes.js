import express from 'express';
const router = express.Router();
import isAuthenticated from '../middleware/isAuthenticated.js';
import {Job} from '../models/job.model.js';

router.post('/post', isAuthenticated, async(req, res) =>{
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "something is missing.",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        })

        return res.status(200).json({
            message: "New job created successfully.",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

// Add this to your job routes
router.get('/public/get', async(req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ],
            status: 'active' // Only show active jobs
        }

        const jobs = await Job.find(query)
            .populate({
                path: "company",
                select: "name logo" // Only get necessary company fields
            })
            .sort({createdAt: -1});

        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('/get/:id', isAuthenticated, async(req, res) =>{
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if(!job){
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.get('/admin/get', isAuthenticated, async(req, res) =>{
    try {
        const adminId = req.id;

        const jobs = await Job.find({created_by: adminId}).populate({
            path: "company"
        })
        if(!jobs){
            return res.status(400).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

export default router;