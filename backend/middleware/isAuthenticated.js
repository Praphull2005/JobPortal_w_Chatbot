import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check both cookies and headers
        if (!token) {
            return res.status(401).json({ message: "User not authenticated", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
        req.id = decoded.userId; // Attach the user ID to the request object
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token", success: false });
    }
};

export default isAuthenticated;