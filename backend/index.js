import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./db.js";
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/compony.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
const app = express();
import path from "path";

app.get('/home', (req, res) => {
    return res.status(200).json({
        message : "I am  comming from backend",
        success : true
    })
})

// Increase timeout for file uploads
app.use((req, res, next) => {
    req.setTimeout(300000); // 5 minutes
    res.setTimeout(300000); // 5 minutes
    next();
});

const _dirname = path.resolve();

//middleware
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({ origin: "https://jobportal-w-chatbot.onrender.com", credentials: true }));
app.use(express.json());


app.use('/user',userRoutes);
app.use('/company',companyRoutes);
app.use('/job',jobRoutes);
app.use('/application',applicationRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend" , "dist", "index.html"));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})