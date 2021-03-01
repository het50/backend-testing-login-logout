const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register',{error_message : ""})
  });

router.post('/register', checkNotAuthenticated, async (req, res) => {
    
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      users.push({
        id: Date.now().toString(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword,
        zip_code: req.body.zip_code
      });
      console.log("users", users)
      res.render('login', {error_message : ""})
    } catch (err) {
      console.log(err);
      res.render('register', {error_message : err.message})
    }
  })
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated) {
    }
    next();
  }
  
  module.exports=router;