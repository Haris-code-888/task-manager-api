import express from 'express';
import { Signin,Signup } from '../controllers/authController.js';

// import { protect } from '../middleware/protect.js';

const router = express.Router();



router.post("/register", Signup )


router.post("/login", Signin)


export default router;