const express = require('express');
const db = require("../db/Conn");
const {userAuth} =require("../Utility/auth");
const router = express.Router();


// CREATE a new user
router.post('/user/create', (req, res) => {
    const { UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender } = req.body;
    
    const sql = `INSERT INTO Users (UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(201).send({ message: 'User created successfully', userId: result.insertId });
        }
    });
});
// GET all users
router.get('/user/getall', (req, res) => {
    const sql = `SELECT * FROM Users`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(200).send(results);
        }
    });
});
// GET a user by ID
router.get('/user/getbyid/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `SELECT * FROM Users WHERE UserId = ?`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.length === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send(result[0]);
        }
    });
});

// Route to fetch user details by userId
router.get("/user/details/:userId", async (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
        u.UserId, u.UserName, u.FatherName, u.MotherName, u.DOB, u.Address, 
        u.Email, u.Phone, u.District, u.State, u.Pincode, u.Age, u.Gender, 
        ud.DetailsId, ud.Img AS profilePhoto, ud.AadhaarCardNumber, 
        ud.FamilyIdNumber, ud.Village, ud.FamilyIdImg, ud.AadhaarFrontImg, 
        ud.AadhaarBackImg, ud.RegistrationId, ud.Signature AS signatureImage, 
        p.PaymentId, p.PlanId, p.order_currency, p.order_id, p.payment_method, 
        p.is_captured, p.payment_completion_time, p.payment_currency, 
        p.bank_reference, p.cf_payment_id, p.order_amount, p.gateway_name, 
        p.gateway_order_id, p.gateway_payment_id, p.payment_group, 
        p.payment_message, p.payment_status, p.payment_time
    FROM Users u
    LEFT JOIN UserDetails ud ON u.UserId = ud.UserId
    LEFT JOIN Payments p ON u.UserId = p.UserId
    WHERE u.UserId = ?
  `;

  try {
    // Open a database connection
    db.connect((err) => {
      if (err) {
        console.error("Database connection error:", err);
        return res.status(500).json({ message: "Database connection error" });
      }

      // Execute the query
      db.query(query, [userId], (error, results) => {
        if (error) {
          console.error("Error executing query:", error);
          return res.status(500).json({ message: "Error executing query" });
        }

        // If no user is found
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }

        // Return the user details
        res.json(results[0]);


      
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE a user by ID
router.put('/user/update/:id', (req, res) => {
    const userId = req.params.id;
    const { UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender } = req.body;

    const sql = `UPDATE Users SET UserName = ?, FatherName = ?, MotherName = ?, DOB = ?, Address = ?, Email = ?, Phone = ?, District = ?, State = ?, Pincode = ?, Age = ?, Gender = ? WHERE UserId = ?`;

    db.query(sql, [UserName, FatherName, MotherName, DOB, Address, Email, Phone, District, State, Pincode, Age, Gender, userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User updated successfully' });
        }
    });
});
// DELETE a user by ID
router.delete('/user/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = `DELETE FROM Users WHERE UserId = ?`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.status(200).send({ message: 'User deleted successfully' });
        }
    });
});






module.exports = router;








