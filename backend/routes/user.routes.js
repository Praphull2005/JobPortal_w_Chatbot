import express from 'express';
const router = express.Router();
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isAuthenticated from '../middleware/isAuthenticated.js';
import { singleUpload } from '../middleware/multer.js';
import getDataUri from '../datauri.js';
import cloudinary from '../cloudinary.js';
import dotenv from "dotenv";
dotenv.config({})
import axios from 'axios';


router.post('/register', singleUpload, async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;

        //yha cloudinary aayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email.",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url //save the clodinary url
            }
        })

        return res.status(200).json({
            meassage: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id // Ensure this matches the payload in the token
        };

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: 'strict' 
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            token,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/logout', async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.post('/profile/update', singleUpload, isAuthenticated, async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // console.log("Uploaded File:", file); // Debugging log

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        //cloudinary aayega idhar
        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "raw"  // Ensure PDF is treated as a raw file
        });



        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; //middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        //updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url; //save the clodinary url
            user.profile.resumeOrignalName = file.originalname; //save the orignal name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Add a job to the user's bookmarks
router.post('/bookmark/:jobId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({ message: "Job already bookmarked", success: false });
        }

        user.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({ message: "Job bookmarked successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Remove a job from the user's bookmarks
router.delete('/unbookmark/:jobId', isAuthenticated, async (req, res) => {
    try {
        const userId = req.id;
        const { jobId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
        await user.save();

        return res.status(200).json({ message: "Job removed from bookmarks", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get("/bookmarked", isAuthenticated, async (req, res) => {
    try {
        const userId = req.id; // Ensure this is the correct user ID from the token
        const user = await User.findById(userId).populate("savedJobs"); // Populate savedJobs
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        // console.log("Fetched Saved Jobs:", user.savedJobs); // Debugging log
        res.status(200).json({ savedJobs: user.savedJobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching saved jobs", error });
    }
});

// Add this to your backend routes (user.route.js or create a new ai.route.js)
router.post('/ai/assist', async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful career assistant. ${context}`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
});

export default router;

