import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import userRoute from './routes/userRoute.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const corsOptions = {
    origin: "http://localhost:3000", // allow only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allowed headers
    credentials: true, // allow cookies and credentials
};

app.use(cors(corsOptions));

app.use('/api/auth', userRoute);

app.get("/", (req, res) => {
    res.send("Hello from Express with MySQL!");
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM registrationTable", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});


// Start server
app.listen(PORT, () => {
    console.log("Server running on port 8080");
});