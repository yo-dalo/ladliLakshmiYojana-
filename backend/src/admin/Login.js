const express = require('express');

const db = require("../db/Conn");

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config/env');
const router = express.Router();

const bcrypt = require("bcryptjs");

const ADMINSECRET_KEY = config.adminjwtkey; // R


const comparePasswords = async (plainPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
};



  
  router.post('/admin/login/v2', async (req, res) => {
  const { adminPhone, adminPassword } = req.body;
  
  if (!adminPhone || !adminPassword) {
    return res.status(400).json({ error: 'adminPhone and adminPassword are required' });
  }
  
  
  
  const fetchSql = `SELECT adminId, adminUserName, adminPassword FROM admin WHERE adminPhone = ?;`;
  
  db.query(fetchSql, [adminPhone], async(err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'This Number no exist ' });
    }

    const record = results[0];
    
    // Check adminOtp expiry
    if (!record.adminPassword) {
      return res.status(400).json({ error: 'adminPassword has Not exist' });
    }
    

    // Validate adminOtp
    
    
    
    

const isMatch = await comparePasswords(adminPassword, record.adminPassword);

    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }



    // Generate JWT token
    const token = jwt.sign({  UserId: record.adminId, name: record.adminUserName }, ADMINSECRET_KEY, { expiresIn: '1d' });
    
    res.cookie(config.adminAuthToken, token, {
      path: '/',
      httpOnly: false, // Keep it secure from JavaScript
      secure: false, // Only enable secure in production
      sameSite: 'Lax', // SameSite None for production, Lax for development
    }).json({ message: 'User login successfully', record });
  });
});






module.exports = router;