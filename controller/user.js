import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
const jwtSecret = "mynameisPriyankaParekhITVGEC$#";

// Register User
function registerUser(req, res) {
    const { fname, lname, email, password, role } = req.body;

    db.query(
        "SELECT * FROM registrationtable WHERE email = ?", [email],
        async(err, results) => {
            if (err)
                return res.status(500).json({ error: err.message, Status: "failure" });

            if (results.length > 0) {
                return res
                    .status(400)
                    .json({ error: "User already exists", Status: "failure" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            db.query(
                "INSERT INTO registrationtable (fname, lname, email, password, role) VALUES (?, ?, ?, ?, ?)", [fname, lname, email, hashedPassword, role],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });

                    if (result.affectedRows === 1) {
                        return res.status(200).json({ Status: "success" });
                    }

                    res
                        .status(500)
                        .json({ error: "Insertion failed", Status: "failure" });
                }
            );
        }
    );
}

// Login User
function loginUser(req, res) {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM registrationtable WHERE email = ?", [email],
        async(err, results) => {
            if (err) {
                console.error("Login error:", err.message);
                return res
                    .status(500)
                    .json({ error: "Internal server error", Status: "failure" });
            }

            if (results.length === 0) {
                return res.status(404).json({ error: "Email not found" });
            }

            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Password incorrect" });
            }

            if (user.role === 'customer') {
                return res.status(403).json({ error: "You are not allowed to login from here.", Status: "failure" });
            }

            const userData = {
                id: user.id,
                email: user.email,
                role: user.role,
            };

            const authToken = jwt.sign(userData, jwtSecret, { expiresIn: 3600 * 5 });

            res.status(200).json({ Status: "success", authToken, data: userData });
        }
    );
}

// get all users
function getAllUsers(req, res) {
    db.query(
        "SELECT fname, lname, email, role FROM registrationtable",
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: "Internal server error",
                    Status: "failure",
                });
            }

            res.status(200).json({
                Status: "success",
                data: results,
            });
        }
    );
}

export { registerUser, loginUser, getAllUsers };