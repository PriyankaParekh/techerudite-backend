import jwt from "jsonwebtoken";
const secret = "mynameisPriyankaParekhITVGEC$#";

// Middleware to authenticate using JWT
const auth = async(req, res, next) => {
    try {
        const header = req.headers["authorization"];
        const token = typeof header === "string" ? header.split(" ")[1] : undefined;

        if (!token) {
            return res.status(405).json({
                Status: "failure",
                Error: {
                    message: "Unauthorized. No token provided.",
                    name: "AuthenticationError",
                    code: "EX-00103",
                },
            });
        }

        const decoded = jwt.verify(token, secret);
        if (decoded && decoded.id) {
            req.user_Id = decoded.id;
        }

        next();
    } catch (error) {
        return res.status(405).json({
            Status: "failure",
            Error: {
                message: "Invalid or expired token.",
                name: "AuthenticationError",
                code: "EX-00105",
            },
        });
    }
};

export default auth;