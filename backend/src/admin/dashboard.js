const express = require('express');
const db = require("../db/Conn");
const {adminAuth} =require("../Utility/auth");
const router = express.Router();


//get new Users
/*
SELECT * FROM Users
LIMIT 10;
*/



router.get('/show/all/dashboard', (req, res) => {
  const sqli = `
  SELECT 'Users' AS table_name, COUNT(*) AS total_rows FROM Users
UNION ALL
SELECT 'admin' AS table_name, COUNT(*) AS total_rows FROM 
admin
UNION ALL
SELECT 'Payments' AS table_name, COUNT(*) AS total_rows FROM Payments

UNION ALL

SELECT 'Plans' AS table_name, COUNT(*) AS total_rows FROM Plans

UNION ALL

SELECT 'order_amount' AS table_name, SUM(order_amount) AS total_rupees FROM Payments;
  `
  db.query(sqli, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});
router.get('/show/new/user/dashboard', (req, res) => {
 // UserId,UserName,FatherName
  const sqli = `
  SELECT UserId,UserName,FatherName FROM Users LIMIT 10;
  `
  db.query(sqli, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});
router.get('/show/new/user/all/details/dashboard', (req, res) => {
 // UserId,UserName,FatherName
  const sqli = `
  SELECT * FROM Users LIMIT 10;
  `
  db.query(sqli, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});


router.get('/show/new/payments/dashboard', (req, res) => {
  const sqli = `
  SELECT UserId,payment_status, PlanId,order_id,payment_time FROM Payments LIMIT 10;
  `
  db.query(sqli, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});
router.get('/show/new/payments/success/dashboard', (req, res) => {
  const sqli = `
  SELECT UserId, PlanId,order_id,payment_time,payment_status  FROM Payments where payment_status = ? LIMIT 10;
  `
  db.query(sqli,["SUCCESS"] ,(err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error ' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});
router.get('/show/new/payments/all/details/dashboard', (req, res) => {
  const sqli = `
  SELECT * FROM Payments LIMIT 10;
  `
  db.query(sqli, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error while getting OTP' });
    }

 // console.log(req.user.UserId);

    res.json({ results});
});
});








module.exports = router;