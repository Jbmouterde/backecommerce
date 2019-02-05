const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const Message = require("../models/Message");
const mongoose = require("mongoose")


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.post("/login", (req,res,next)=>{
  const myFunction =
 passport.authenticate("local", (err, theUser)=>{
   if(err){
     next(err);
     return; 
   }
   if(!theUser){
     const err = new Error("Log in Failed");
     err.status=400;
     next(err);
     return;
   }
   req.login(theUser, ()=>{
     theUser.password = undefined;
     res.json({userInfo : theUser});
   })
 });
 myFunction(req,res,next)

});
// CREATE MESSAGE 
// authRoutes.post("/message", (req,res,next)=>{
//   const {message}= req.body;
//   Message.create ({message})
//   .then((newMessage)=>{
//     res.json(newMessage);
//   })
//   .catch((err)=>{
//     next(err);
//   })
// })


authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const role = req.body.role;
  const message = req.body.message;


  if (username === "" || password === "") {
    //new
    const err = new Error("Username or Password invalid");
    err.status = 400;
    next(err);
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      const err = new Error("Username  already exist");
      err.status = 400;
      next(err);
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass, 
      email, 
      role:"admin",
      message

    
    });

    newUser.save((err) => {
      if (err) {
        next(err);
      } else {
        // clear the password before sending
        req.login(newUser,()=>{
        newUser.password = undefined;
        res.json({userInfo : newUser});
      })
      }
    });
  });
});

// detail user 
authRoutes.get("/users", (req,res,next)=>{
  // find gives an Array
  User
  .find()
  // .limit(6)
  .sort({createdAt: -1})
  .then((users)=>{
    res.json(users);
  })
  .catch((err)=>{
    next(err);
  })
})


// GET DETAILS 
authRoutes.get("/users/:userId", (req,res,next)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)){
    next();
    return; 
  }

  User.findById(req.params.userId)
  .then((user)=>{
    if(!user){
      next(); // show error if phone was not found
      return;
    }
    res.json(user)
  })
  .catch((err)=>{
    next(err)
  })
})

//UPDATE 

// PUT /api/user/:userId/edit
authRoutes.put("/users/:userId/edit", (req,res,next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.userId)){
    next();  // show 404 if bad ObjectId format
    return;
}
const {username, email} = req.body 

  User.findByIdAndUpdate (
    req.params.userId,
    {username, email}, // =======>>>>>>>>>> AAAAASSSSKKKKKK
    {runValidators: true, new: true }  //new gets us the updated version
  )
  .then((updateUser)=> {
    if(!updateUser) {
      next(); // show 404 if no user was found 
      return;
    }
    res.json(updateUser);
  })

  .catch((err)=>{
    next(err);
  })
})



authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.json({userInfo : null});
});


authRoutes.get("/checklogin", (req,res,next)=>{
  if(req.user){
  req.user.password = undefined;
}
  res.json({userInfo : req.user});
});


authRoutes.delete("/users/:userId", (req,res,next)=>{
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)){
    next();
    return; 
  }
User.findByIdAndRemove(req.params.userId)
.then((removeUser)=>{
  if(!removeUser){
    next(); // 
    return;
  }
  res.json(removeUser);
})
.catch((err)=>{
  next(err);
})
});


module.exports = authRoutes;
