const AccessControl = require('accesscontrol');

const ac = new AccessControl();

ac.grant('EMPLOYEE')
  .createAny('module')
  .readAny('module')
  .updateAny('module')
  .deleteAny('module')
  .createAny('permission')
  .readAny('permission')
  .updateAny('permission')
  .deleteAny('permission')
  .createAny('attendance')
  .readAny('attendance')
  .updateAny('attendance')
  .deleteAny('attendance')
  .createAny('leave')
  .readAny('leave')
  .updateAny('leave')
  .deleteAny('leave');

ac.grant('HR')
  .createAny('attendance')
  .readAny('attendance')
  .updateOwn('attendance')
  .createOwn('leave')
  .readAny('leave')
  .updateOwn('leave');

ac.grant('ADMIN')
  .createAny('attendance')
  .readOwn('attendance')
  .updateOwn('attendance')
  .createOwn('leave')
  .readOwn('leave')
  .updateOwn('leave');






// Middleware to authenticate and authorize users
// function authenticateUser(req, res, next) {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).send('Access denied. No token provided.');
  
//     try {
//       const decoded = jwt.verify(token, jwtSecret);
//       req.user = decoded;
//       next();
//     } catch (error) {
//       res.status(400).send('Invalid token.');
//     }
//   }
  
//   // Middleware to check if a user has the required role
//   function checkUserRole(requiredRole) {
//     return (req, res, next) => {
//       if (req.user && (req.user.role === roles.admin)) {      
//         next();
//       } else if (req.user.role === roles.hr && requiredRole === roles.employee) {
//         next(); // Managers have access to the employee route
//       } else if (req.user.role === requiredRole) {
//         next(); // Employees have access to their own route
//       } else {
//         res.status(403).send('Access denied. Insufficient privileges.');
//       }
//     };
//   }


module.exports=ac