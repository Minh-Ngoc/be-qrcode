const TaiKhoan = require('../models/TaiKhoan');
const { mutipleMongooseToObject } = require('../../util/mongoose');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class AuthenticationController {
    index(req, res, next) {
        // TaiKhoan.find({})
        //     .then((taikhoans) => {
                res.render('home');
                    // taikhoans: mutipleMongooseToObject(taikhoans),
            //     });
            // })
            // .catch(next);
    }

    async register (req, res, next) {
        const { username, password } = req.body;

        if(!username || !password) {
            res.status(400).json({ success: false, message: 'Missing username and/or password' })
        };

        try {
            const user = await User.findOne({ username })

            if (user)
                return res.status(400).json({ success: false, message: 'Username already taken' })

            // All good
            const hashedPassword = await argon2.hash(password)
            const newUser = new User({ username, password: hashedPassword })
            await newUser.save()

            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET
            )

            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })
        } catch (error) {
            
        }
    }
}

module.exports = new AuthenticationController();
