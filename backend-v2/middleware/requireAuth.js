import pkg from 'jsonwebtoken';
import User from '../models/User.js';
const { TokenExpiredError, verify } = pkg;

async function requireAuth (req, res, next) {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({error:"Authorization token required"})
    }

    const token = authorization.split(' ')[1];
    
    try {

        const { id } = verify(token, process.env.JWT_SECRET)

        const response = await User.findByPk(id);

        console.log(response);  

        const user = response.toJSON();

        console.log(user)

        req.user = user
        next();

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({error:"Request is not authorized"});    
        }
        console.log(error)
        return res.status(500).json({error:"internal server error"});    
    }
}



export default requireAuth