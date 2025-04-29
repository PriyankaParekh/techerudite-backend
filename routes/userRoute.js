import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controller/user.js";
import auth from "../auth/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-all-users", auth, getAllUsers);

export default router;