# Job Portal - MERN Stack Application

A full-stack job portal application built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, job listings, company profiles, and an AI-powered career assistant.

## Features

- **User Authentication**: Signup/login for job seekers and employers
- **Job Management**: Post, browse, and apply for jobs
- **Company Profiles**: Create and manage company information
- **Application Tracking**: Submit and track job applications
- **Admin Dashboard**: Manage companies, jobs, and applicants
- **AI Career Assistant**: 
  - Resume optimization suggestions
  - Personalized career advice
  - Interview preparation tips
  - Job search recommendations

## Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS (or your preferred styling solution)
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- Cookie-parser for session management
- CORS for cross-origin requests

**AI Integration:**
- (Specify if you're using any particular AI service/API)

## Project Structure

### Backend (index.js)
- Express server configuration
- Middleware setup (CORS, cookie-parser, timeout settings)
- Route handlers for:
  - User authentication (`/user`)
  - Company management (`/company`)
  - Job operations (`/job`)
  - Application handling (`/application`)
- MongoDB connection
- Environment variable management with dotenv

### Frontend (App.jsx)
- React Router configuration with protected routes
- Public routes:
  - Homepage
  - Login/Signup
  - Job listings
  - Browse companies
  - Job descriptions
  - AI Assistant
- Protected admin routes:
  - Company management
  - Job posting
  - Applicant tracking
- User routes:
  - Profile management
  - Saved jobs
