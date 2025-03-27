import express from 'express';
const router = express.Router();
import isAuthenticated from '../middleware/isAuthenticated.js';
import jwt from 'jsonwebtoken';
import {Company} from '../models/company.model.js';
import { singleUpload } from '../middleware/multer.js';
import getDataUri from '../datauri.js';
import cloudinary from '../cloudinary.js';

router.post('/register',isAuthenticated, async(req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({
                message: "Company name is required.",
                success : false
            })
        }

        let company = await Company.findOne({name: name});
        if(company){
            return res.status(400).json({
                message: "Company name is already registered.",
                success : false
            })
        }

        company = await Company.create({
            name : name,
            userId : req.id
        })

        return res.status(200).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
        

    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.get('/get', isAuthenticated, async(req, res) =>{
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({userId});

        if(!companies){
            return res.status(400).json({
                message: "Companies not found.",
                success : false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.get('/get/:id', isAuthenticated, async(req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company){
            return res.status(400).json({
                message: "Company not found.",
                success : false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})

router.put('/update/:id', singleUpload, isAuthenticated, async(req, res) =>{
    try {
        const updateId = req.params.id;
        const {name, description, website, location} = req.body;
        const file = req.file;
        

        //cloudinary yha aayega
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(updateId, updateData, {new: true});


        if(!company){
            return res.status(400).json({
                message: "Company not found.",
                success : false
            })
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({error : 'Internal server error'})
    }
})  

export default router;