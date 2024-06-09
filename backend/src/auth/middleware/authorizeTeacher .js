/// authorizeTeacher.js middleware

const authorizeTeacher = (req, res, next) => {
    // Assuming req.user.role contains the user's role after authentication
    if (req.user && req.user.role === 'teacher') {
      next(); // Allow the request to proceed to the route handler
    } else {
      res.status(403).json({ error: 'Unauthorized' }); // Forbidden if not a teacher
    }
  };
  
  module.exports = { authorizeTeacher };
  
  
  