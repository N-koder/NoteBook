const jwt = require('jsonwebtoken');
// const string for sign webtoken
const JWT_SECRET  = 'yo@vmro';
const fetchUser = (req ,res , next) => {
    // Get the user from JWT token and add the ID to req object 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error : "please autheticate using  a valid token"})
    }

    try {
        
        const data = jwt.verify(token , JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error : "please autheticate using  a valid token"})
    }
}

module.exports = fetchUser;
