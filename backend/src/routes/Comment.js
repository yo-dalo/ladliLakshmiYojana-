const express = require('express');
const db = require("../db/Conn");
const router = express.Router();
const {userAuth} =require("../Utility/auth");


// API to get all comments
router.get('/comments', (req, res) => {
    db.query('SELECT * FROM Comments ORDER BY CreatedAt DESC', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// API to add a new comment
router.post('/comments',userAuth, (req, res) => {
  
    const {CommentText} = req.body;
    const UserName = req.user.name;
    const userId = req.user.UserId;
    
    if (!UserName || !CommentText) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO Comments (UserName, CommentText,userId) VALUES (?, ?,?)';
    db.query(sql, [UserName, CommentText,userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Comment added successfully', id: result.insertId });
    });
});

// API to delete a comment
router.delete('/comments/:id',userAuth, (req, res) => {
    const { id } = req.params;
    const userId = req.user.UserId;
    db.query('DELETE FROM Comments WHERE Id = ? and userId= ? ', [id,userId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Comment deleted successfully' });
    });
});


module.exports= router;

