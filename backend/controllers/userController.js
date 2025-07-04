import validator from "validator";
import bcrypt from "bcrypt";
import initDB from "../db/connection.js";
import { createToken } from "../helpers/jwtHelper.js";

async function loginUser(req, res) {}
async function signupUser(req, res) {
    const { email, password } = req.body;
    try {
        const db = await initDB();

        if (!email || !password) {
            throw Error("all fields must be filled");
        }

        if (!validator.isEmail(email)) {
            throw Error("Email not Valid");
        }
        if (!validator.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }

        const [exists] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (exists.length > 0) {
            throw Error("Email Already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const match = await bcrypt.compare(password);

        const [row] = await db.execute(
            "INSERT INTO users (email, password) values (?, ?)",
            [email, hashPassword]
        );
        const insertId = row.insertId;

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
