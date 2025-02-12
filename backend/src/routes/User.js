const express = require('express');
const conn = require("../db/Conn");
const router = express.Router();
const {userAuth} =require("../Utility/auth");





router.get('/api/v1/login', (req, res) => {
    res.json({ message: 'Welcome to Express.js!' });
});

router.post('/api/v1/test/',userAuth, (req, res) => {
  console.log(req.user);
    res.json(req.user);
    
});









router.get('/verify/user/cookia',userAuth,(req,res)=>{
    //res.json({ message: 'Welcome to Express.js!' });
    const data =  req?.user
    
    
res.json( {
    detailsId: data.DetailsId || null,
    phone: data.phone,
    userId: data.UserId,
    name: data.name
  }
  );
  
  
  
})








module.exports = router;