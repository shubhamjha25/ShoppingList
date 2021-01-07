const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');


// User Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Authenticate Users
// @access  Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
    
    // Simple validation
    if(!email || !password) {
        res.status(400).json({ msg: 'Please Provide Correct Credentials'});
    }

    // Checking For Existing User
    User.findOne({ email: email})
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: 'User Not Found'});
            } 

            // Confirm Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch)
                        return res.status(400).json({ msg: "Invalid Credentials"});
                    
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 1800 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    );
                })
        });
});

// @route   GET api/auth/user
// @desc    Get User Data
// @access  Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router; 