import jwt from "jsonwebtoken";

function createToken(id) {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d",
        }
    );
}

export { createToken };
