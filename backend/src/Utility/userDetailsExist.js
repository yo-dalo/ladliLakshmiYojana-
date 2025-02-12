const db = require('../db/Conn.js');


const userDetailsExist= (req,res,next)=>{
  
  if(!req.user.UserId){
        return res.status(401).json({ message: 'User id not Exist' });
  }
  const sql ="select UserId from UserDetails WHERE UserId= ?"
    db.query(sql,[req.user.UserId],(err,result)=>{
     // console.log(result)
      if(err){ 
          return res.status(403).json({ message: 'uer userDetailsExist err' });
      }
      if(result.length<=0){
       return res.status(403).json({ message: 'user Detail Not Exist ',run:1 });
      }
      next();
    })
    
}


module.exports ={userDetailsExist}