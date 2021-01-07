const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register New Users
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    
    // Simple validation
    if(!name || !email || !password) {
        res.status(400).json({ msg: 'Please Provide Correct Credentials'});
    }

    // Checking For Existing User
    User.findOne({ email: email})
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: 'User Already Exists'});
            }

            // Creating The New User If The User Doesn't Exists
            const newUser = new User({name, email, password});

            // Hashing The Password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

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
                        });
                });
            });
        });
});

module.exports = router; 