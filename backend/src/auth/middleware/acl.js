'use strict';

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      // Check if the user's capabilities include the required capability
      if (req.user && req.user.capabilities && req.user.capabilities.includes(capability)) {
        next(); // Proceed to the next middleware or route handler
      } else {
        next('Access Denied'); // If capability is not present, deny access
      }
    } catch (e) {
      next('Invalid Login'); // Handle any errors, typically related to user authentication
    }
  };
};
