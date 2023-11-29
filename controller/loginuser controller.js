const loginUsers = require('../modals/userlogin schema');
const otp_Verification = require('../modals/otp schema');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const { roles } = require('../utils/constants'); // Define your role constants
// const ac=require('../middleware/role access')

const jwtSecret = 'your-secret-key';

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
  .updateAny('attendance')
  .createAny('leave')
  .readAny('leave')
  .updateAny('leave');

ac.grant('ADMIN')
  .createAny('attendance')
  .readAny('attendance')
  .updateAny('attendance')
  .createAny('leave')
  .readAny('leave')
  .updateAny('leave');


<<<<<<< HEAD
// Middleware to check if a user has the required role

function checkUserRole(action, resource) {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming req.user.role contains the user's role
    console.log(userRole);
    if (userRole) {
      const permission = ac.can(userRole)[action](resource);

      if (permission.granted) {
        next(); // User has the required permission, proceed to the next middleware/route handler
      } else {
        res.status(403).json({ error: 'Forbidden' }); // User does not have the required permission
      }
    } else {
      res.status(403).send('Access denied. Insufficient privileges.');
    }
  };
}


function authenticateUser(req, res, next) {
  const token = req.header('authtoken');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
}

=======
  // Middleware to check if a user has the required role
  
  function checkUserRole(action, resource) {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming req.user.role contains the user's role
      console.log(userRole);
      if (userRole) {
        const permission = ac.can(userRole)[action](resource);
  
        if (permission.granted) {
          next(); // User has the required permission, proceed to the next middleware/route handler
        } else {
          res.status(403).json({ error: 'Forbidden' }); // User does not have the required permission
        }
      } else {
        res.status(403).send('Access denied. Insufficient privileges.');
      }
    };
  }
  
  
  function authenticateUser(req, res, next) {
    const token = req.header('authtoken');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).send('Invalid token.');
    }
  }
  
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe


// Controller functions
const getUsers = async (req, res) => {
  try {
    const users = await loginUsers.find();

    if (users && users.length > 0) {
      res.status(200).send(users);
    } else {
      res.status(400).send("No Users");
    }
  } catch (err) {
    res.status(400).send('error:' + err);
  }
};

const registerUser = async (req, res) => {
  try {
    // ... Your registration code
<<<<<<< HEAD
    const schema = Joi.object({ Email: Joi.string().email().required(), Password: Joi.string().required(), Repeat_Password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { Email } = req.body;
    const user = await loginUsers.findOne({ Email });

    if (!user) {
      if (req.body.Password === req.body.Repeat_Password) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.Password, salt, async (err, hashedPassword) => {
            const Password = hashedPassword;
            const newUser = new loginUsers({ Email, Password });
            try {
              await newUser.save();
              res.status(200).send('User Registered Successfully');
            } catch (saveError) {
              res.status(400).send('error:' + saveError.message);
            }
          })
        })
      } else {
        // Moved this line inside the 'else' block
        res.status(501).send('Password is not match');
      }
    } else {
      res.status(400).send('User Already Registered');

    }
=======
        const schema = Joi.object({ Email: Joi.string().email().required(),Password:Joi.string().required(),Repeat_Password:Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const { Email } = req.body;
        const user = await loginUsers.findOne({Email});     
        
        if(!user){
          if (req.body.Password === req.body.Repeat_Password) {
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(req.body.Password, salt, async (err, hashedPassword) => {
                      const Password = hashedPassword;
                      const newUser = new loginUsers({ Email, Password });
                      try {
                          await newUser.save();
                          res.status(200).send('User Registered Successfully');
                        } catch (saveError) {
                          res.status(400).send('error:' + saveError.message);
                        }
                  })
              })
          } else {
              // Moved this line inside the 'else' block
              res.status(501).send('Password is not match');
          }
        }else{
          res.status(400).send('User Already Registered');

        }
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


///////////////////////////////////////////////
<<<<<<< HEAD

const loginUser = async (req, res) => {
  try {
    // ... Your login code
    const schema = Joi.object({ Email: Joi.string().email().required(), Password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var user = await loginUsers.findOne({ Email: req.body.Email })
    if (!user) {
      return res.status(400).send('Email or User not found')
    }

    var validpassword = await bcrypt.compare(req.body.Password, user.Password)
    if (!validpassword) {
      return res.status(400).send('Password incrroect')
    }

=======
  
const loginUser = async (req, res) => {
  try {
    // ... Your login code
    const schema = Joi.object({ Email: Joi.string().email().required(), Password:Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    var user= await loginUsers.findOne({Email:req.body.Email})
    if(!user){
        return res.status(400).send('Email or User not found')
    }

    var validpassword = await bcrypt.compare(req.body.Password,user.Password)
    if(!validpassword){
        return res.status(400).send('Password incrroect')
    }
    
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    const token = jwt.sign({ id: user.Email, role: user.role }, jwtSecret);
    res.header('authtoken', token).send('Login successful.');
    console.log(token)
  } catch (err) {
    // Handle or log errors here
    res.status(500).send('Internal server error:' + err);

  }
};

function generateOTP() {
<<<<<<< HEAD
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

=======
    const min = 1000; // Minimum 4-digit number
    const max = 9999; // Maximum 4-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
const forgotPassword = async (req, res) => {
  try {
    // ... Your forgot password code
    const schema = Joi.object({ Email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


<<<<<<< HEAD
    const { Email } = req.body;
    const user = await loginUsers.findOne({ Email });

    if (!user) {
      return res.status(400).send('user not found')
=======
    const{ Email }=req.body;
    const user = await loginUsers.findOne({Email});

    if(!user){
        return res.status(400).send('user not found')
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    }

    const otp = generateOTP();
    console.log(`Generated OTP: ${otp}`);

<<<<<<< HEAD
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmail,
        pass: process.env.password
      },

    })
    const message = {
      from: process.env.gmail,
      to: user.Email,
      subject: 'passreset request',
      text: `your account reset token code is ${otp}`
=======
    const transporter= nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: process.env.gmail,
            pass: process.env.password
        },

    })
    const message={
        from :process.env.gmail,
        to : user.Email,
        subject : 'passreset request',
        text: `your account reset token code is ${otp}`
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    };
    console.log(otp)

    // const hashOTP = await bcrypt.hash(otp,10);
    const newOTPverification = otp_Verification({
<<<<<<< HEAD
      userId: user._id,
      Email: user.Email,
      otp: otp,
      createAt: Date.now(),
      expiresAt: Date.now() + 60000,
=======
        userId:user._id,
        Email:user.Email,
        otp:otp,
        createAt: Date.now(),
        expiresAt: Date.now() + 60000,
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    });

    console.log(otp)

    await newOTPverification.save();
<<<<<<< HEAD
    await transporter.sendMail(message);
    res.status(200).send("Verification otp mail sended")
=======
    await   transporter.sendMail(message);
    res.status(200).send("Verification otp mail sended" )
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    return Email
  } catch (error) {
    res.status(400).send(error);
  }
};



<<<<<<< HEAD
const resendOTP = async (req, res) => {
  try {
    // ... Your forgot password code
    const schema = Joi.object({ Email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const { Email } = req.body;

    const user = await loginUsers.findOne({ Email });

    if (!user) {
      return res.status(400).send('user not found')
    }

    const otp = generateOTP();
    console.log(`Generated OTP: ${otp}`);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.gmail,
        pass: process.env.password
      },

    })
    const message = {
      from: process.env.gmail,
      to: user.Email,
      subject: 'passreset request',
      text: `your account reset token code is ${otp}`
    };

    // const hashOTP = await bcrypt.hash(otp,10);
    const newOTPverification = otp_Verification({
      userId: user._id,
      otp: otp,
      createAt: Date.now(),
      expiresAt: Date.now() + 360000,
    });

    console.log(otp)

    await newOTPverification.save();
    await transporter.sendMail(message);
    res.status(200).send(

      "Verification otp mail sended"

    )
  } catch (error) {
    res.status(400).send(error);
  }
};
=======
const resendOTP= async (req, res) =>{
    try {
      // ... Your forgot password code
      const schema = Joi.object({ Email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
  
      const{ Email }=req.body;
  
      const user = await loginUsers.findOne({Email});
  
      if(!user){
          return res.status(400).send('user not found')
      }
  
      const otp = generateOTP();
      console.log(`Generated OTP: ${otp}`);
  
      const transporter= nodemailer.createTransport({
          service:"gmail",
          auth: {
              user: process.env.gmail,
              pass: process.env.password
          },
  
      })
      const message={
          from :process.env.gmail,
          to : user.Email,
          subject : 'passreset request',
          text: `your account reset token code is ${otp}`
      };
  
      // const hashOTP = await bcrypt.hash(otp,10);
      const newOTPverification = otp_Verification({
          userId:user._id,
          otp:otp,
          createAt: Date.now(),
          expiresAt: Date.now() + 360000,
      });
  
      console.log(otp)
  
      await newOTPverification.save();
      await   transporter.sendMail(message);
      res.status(200).send(
         
          "Verification otp mail sended"
         
      )
    } catch (error) {
      res.status(400).send(error);
    }
  };
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe




const verifyOTP = async (req, res) => {
  try {
    // ... Your OTP verification code
    const { otp } = req.body;
<<<<<<< HEAD
    const user = await otp_Verification.findOne({ otp });
    if (!otp) {
      res.status(400).send("empty otp is not allowed.");
    } else {
      const verify_otp = await otp_Verification.find({ otp });

=======
    const user = await otp_Verification.findOne({otp});  
    if ( !otp) {
      res.status(400).send("empty otp is not allowed.");
    } else {
      const verify_otp = await otp_Verification.find({otp});
        
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
      if (verify_otp.length <= 0) {
        res.status(400).send("No matching OTP verification record found.");
      } else {
        const { expiresAt } = verify_otp[0];
        const hashedOTP = verify_otp[0].otp;

        if (expiresAt < Date.now()) {

          await otp_Verification.deleteMany({ otp });
          res.status(400).send("OTP code has expired.");
        } else {

          // const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!otp) {

            res.status(400).send("Wrong OTP Entered ");
          } else {

            await loginUsers.updateOne({ _id: otp_Verification.userId }, { verified: true });
            await otp_Verification.deleteMany({ otp })
            res.status(200).send("User Otp verified");
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
<<<<<<< HEAD
    res.status(500).send('Internal Server Error', error);
=======
    res.status(500).send('Internal Server Error',error);
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
  }
};


const resetPassword = async (req, res) => {
<<<<<<< HEAD
  const userId = req.params.email;
    console.log('User ID:', userId)
  try {
    const schema = Joi.object({
      Password: Joi.string().required(),
      Repeat_Password: Joi.string().required(),
=======
  try {
    const schema = Joi.object({
      Password:Joi.string().required(),
      Repeat_Password:Joi.string().required(),
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    });

    const { error } = schema.validate(req.body);

<<<<<<< HEAD
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

=======
    if  (error) {
      return res.status(400).send(error.details[0].message);
    }

>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
    const { Password, Repeat_Password } = req.body;

    if (Password !== Repeat_Password) {
      return res.status(403).send("Passwords do not match");
    }

    bcrypt.genSalt(10, async (err, salt) => {
      if (err) {
        return res.status(500).send("Failed to generate salt");
      }

      bcrypt.hash(Repeat_Password, salt, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).send("Failed to hash password");
        }

        const newpassword = hashedPassword;

<<<<<<< HEAD
        console.log("User ID to find:", req.params.id);

        const user = await loginUsers.findOneAndUpdate(
          { Email: req.params.email },
          { Password: newpassword },
          { new: true }
        );
        

        console.log("Updated user:", user);

        if (!user) {
          return res.status(400).send("User not found");
        }

        console.log("Password reset successful");
        res.status(200).send("Password reset successful");
=======
       
          const user = await loginUsers.findOneAndUpdate(
            { Email: req.params.email }, // Corrected query
            { Password: newpassword }, // Assuming 'password' is the field in your schema
            { new: true }
          );

          if (!user) {
            return res.status(400).send("User not found");
          }

          return res.status(200).send( "Password reset successful");
      
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
      });
    });
  } catch (err) {
    console.error(err);
<<<<<<< HEAD
    res.status(500).send("Internal server error");
=======
    res.status(500).send('Internal server error');
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
  }
};



<<<<<<< HEAD


=======
>>>>>>> 6865a817290281c9bdfd0135ef93d72d6a6263fe
module.exports = {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword,
  resendOTP,
  verifyOTP,
  resetPassword,
  checkUserRole,
  authenticateUser
};


