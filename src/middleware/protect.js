import jwt from "jsonwebtoken"

export function protect(req,res,next){
    let token;

  // 1. Check for the Authorization header and ensure it starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract the raw token from the header array ["Bearer", "token_string"]
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the JWT using your environment's secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Attach the decoded user payload to the request object
      req.user = decoded;

      // 5. Advance to the next middleware or route handler
      return next();
      
    } catch (error) {
      // Handle verification failure (expired, tampered, or invalid token)
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized, token verification failed' 
      });
    }
  }

  // Handle missing token entirely
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, no token provided' 
    });
  }
}