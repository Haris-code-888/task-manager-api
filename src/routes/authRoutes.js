import express from 'express';
import { Signin,Signup } from '../controllers/authController.js';

// import { protect } from '../middleware/protect.js';

const router = express.Router();



router.post("/auth/register", Signup )


router.post("/auth/login", Signin)


export default router;