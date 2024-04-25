import { SignUp, Login } from "../Controllers/AuthController.js";
import { Router } from "express";
import { userVerification } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/", userVerification);

export default router;
