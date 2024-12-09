const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const auth = require("../auth.js");

module.exports.registerUser = (req, res) => {
    if (!req.body.email || typeof req.body.email !== 'string' || !req.body.email.includes('@')) {
        return res.status(400).send({ message: 'Invalid email format' });
    }

    if (!req.body.password) {
        return res.status(400).send({ message: 'Password is required' });
    }

    if (typeof req.body.password !== 'string' || req.body.password.trim().length <= 8) {
        return res.status(400).send({ message: 'Password must be longer than 8 characters' });
    }

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password.trim(), 10) // Trim spaces before hashing
    });

    return newUser.save()
        .then((result) => res.status(201).send({
            message: 'User Registered Successfully',
            user: result
        }))
        }

module.exports.loginUser = (req, res) => {
    if (!req.body.email || typeof req.body.email !== 'string' || !req.body.email.includes('@')) {
        return res.status(400).send({ message: 'Email does not match the correct format' });
    }

    return User.findOne({ email: req.body.email })
        .then((result) => {
            if (!result) {
                return res.status(404).send({ message: 'No email found' });
            }

            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
            if (isPasswordCorrect) {
                return res.status(200).send({
                    message: 'Logged in Successfully',
                    access: auth.createAccessToken(result) // Ensure this function exists
                });
            } else {
                return res.status(400).send({ message: 'Password doesn\'t match' });
            }
        })
        .catch(error => errorHandler(error, req, res));
};
