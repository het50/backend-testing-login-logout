const express = require('express');
const router = express.Router();


router.delete('/logout', (req, res) => {
 req.logOut()
 res.redirect('/login')})
    
module.exports=router;
