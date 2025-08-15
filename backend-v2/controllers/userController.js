import validator from "validator";
import bcrypt from "bcrypt";
import { createToken } from "../helpers/jwtHelper.js";
import User from "../models/User.js";

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {

        if (!email || !password) {
            throw Error("all fields must be filled");
        }
        if (!validator.isEmail(email)) {
            throw Error("Email not Valid");
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw Error("Incorrect Email");
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error("Incorrect password")
        }

        const token = createToken(user.id);

        return res.status(201).json({
            token,
            email: user.email,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
}
async function signupUser(req, res) {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            throw Error("all fields must be filled");
        }

        if (!validator.isEmail(email)) {
            throw Error("Email not Valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }

        const user = await User.findOne({ where: { email } });


        if (user) {
            throw Error("Email Already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const response = await User.create({
            email,
            password: hashPassword,
        })

        const newUser = response.toJSON();


        const insertId = newUser.id;

        const token = createToken(insertId);

        return res.status(201).json({
            token,
            email,
        });
    } catch (error) {
        return res.status(400).json({
            error: error.message,
        });
    }
}

export { loginUser, signupUser };
