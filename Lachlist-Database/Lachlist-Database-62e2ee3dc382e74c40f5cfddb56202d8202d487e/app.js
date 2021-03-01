if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')

const app = express()
const login=require('./routes/login')
const register=require('./routes/register')
const logout=require('./routes/logout')

const bcrypt = require('bcrypt')

const passport = require('passport')

const flash = require('express-flash')

const session = require('express-session')

const methodOverride = require('method-override')

let cors = require('cors');

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const initializePassport = require('./passport-config')
const e = require('express')

initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []      //to use in local w/o database
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(flash())

// Express session middleware

app.use(session({
  secret: "process.env.SESSION_SECRET",  //
  resave: false,        //
  saveUninitialized: false
})
)

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

//app.use(flash());
app.get('/', (req, res) => {
  res.render('register',  {error_message : ""});
});
/*
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login',{error_message : ""})
  })
app.post('/login', checkNotAuthenticated,async (req, res) => {
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
        res.render("login", { error_message: "email address doesn't exist. Please try again."});
      }
    }
  } catch (e) {
    res.json({ "error": 1, "message": e.message });
  }
})
*/
app.use('/login',login)
app.use('/register',register)
app.use('/logout',logout)
/*
app.post('/register', checkNotAuthenticated, async (req, res) => {
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
})*/
/*
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
*/

function passportAuthentication() {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
}

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

const port = 5000;

app.listen(port, () => {
  console.log("Hello");
})


