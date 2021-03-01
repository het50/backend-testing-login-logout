const express = require('express');
const router = express.Router();

let cors = require('cors');
//app.use(cors());
//const users = []  
router.get('/', async (req, res) => {

    res.render('login',{error_message : ""})

});
router.post('/', checkNotAuthenticated,async (req, res) => {
    console.log("Hello")
    try {
      if(!req.body.email){
        res.json({"message" : "Please provide email address"});
      }else{
        if(users.some(dt=> dt.email == req.body.email)){
          let password = users.find(dt => dt.email == req.body.email).password;
          let result = await bcrypt.compare(req.body.password, password);
          if(result){
            res.send("Login Successfully!")
          }else{
            res.render("login", {error_message : "Invalid Credentials"})
          }
        }else{
          res.render("login", { error_message: "email address or Password doesn't exist. Please try again."});
        }
      }
    } catch (e) {
      res.json({ "error": 1, "message": e.message });
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
  
  
module.exports = router;