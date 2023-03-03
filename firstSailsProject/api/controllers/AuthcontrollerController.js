/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable indent */
/**
 * AuthcontrollerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {

    signup: async (req, res) => {

        // Get the user's preferred language
        const lang = req.getLocale();

        const { name, email, password } = req.body;

        // check user email is already exists or not
        try {
            const user = await User.findOne({ email })
            {
                if (user) {
                    return res.status(401).json({
                        message2: console.log(lang),
                        message: sails.__(
                            'emailAlreadyExists',
                            { lang: lang }
                        )
                    })
                }
            }

            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);

            // add user in database
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            }).fetch();

            //return a response message 
            return res.json({ message: sails.__(`user.created`, { lang }), user: newUser });
        }
        catch (error) {
            return res.status(500).json({ error: error + "hello" });
        }

    },

    login: async (req, res) => {

        // Get the user's preferred language
        const lang = req.getLocale();

        const { email, password } = req.body;

        //find the user
        try {
            const user = await User.findOne({ email })
            {
                if (!user) {
                    return res.status(401).json({
                        message: sails.__(
                            'invalidCredentials',
                            { lang: lang }
                        )
                    })
                }
            }

            //check the password
            const checkPassword = await bcrypt.compare(req.body.password, user.password);

            if (checkPassword === true) {

                //generate token
                const token = jwt.sign({ email, password }, "hello", { expiresIn: "1h" })

                console.log(token);

                //add token in database
                const userUpdate = await User.updateOne({ email }, { token: token })

                console.log(userUpdate);

                res.status(200).json({
                    message: sails.__(
                        'validCredentials',
                        { lang: lang }
                    )
                })
            } else {
                res.status(401).json({
                    message: sails.__(
                        'invalidCredentials',
                        { lang: lang }
                    )
                })
            }
        } catch (error) {
            return res.status(500).json({ error: error + "hello" });
        }
    },

    logout: async (req, res) => {

        // Get the user's preferred language
        const lang = req.getLocale();

        // get user id from link
        const { id } = await req.params;

        const user = await User.findOne({ id })

        // Verify the JWT token
        await sails.helpers.verify-token(user.token, "hello");

        console.log(user);
        const userUpdate = await User.updateOne({ id }, { token: "" })

        res.status(200).json({
            message: sails.__('logoutSuccessful', { lang: lang })
          })

    }
};

