const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../utils/validators.js')
const {SECRET_KEY} = require('../../config.js');
const User = require('../../app/models/User');


function generateToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Query: {
        async getUser() {
            try {
                return await User.find();
            } catch (e) {
                throw  new Error(e)
            }
        }
    },

    Mutation: {
        async register(_, {
            registerInput: {username, email, password, confirmPassword}
        }, context, info) {

            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            let user = await User.findOne({username});
            if (user) {
                throw  new UserInputError('Username already taken', {
                    username: 'This username is already taken',

                });
            }

            user = await User.findOne({email});
            if (user) {
                throw  new UserInputError('Email already taken', {
                    email: 'This email is already taken'

                });
            }


            //todo: hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }


        },

        async login(_, {loginInput: {username, password}}, context, info) {
            const {errors, valid} = validateLoginInput(
                username, password);

            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const user = await User.findOne({username});


            if (!user) {
                errors.general = 'User does not exist';
                throw new UserInputError('User does not exist', {errors})
            } else {
                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    errors.general = 'Invalid credentials';
                    throw new UserInputError('Invalid credentials', {errors});
                } else {
                    const token = generateToken(user);

                    return {
                        ...user._doc,
                        id: user._id,
                        token
                    }
                }
            }
        }


    }

}