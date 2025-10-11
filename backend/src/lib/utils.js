import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
    const {JWT_SECRET} = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in env variables")
    }
    const token  = jwt.sign({userId:userId}, process.env.JWT_SECRET ,{
        expiresIn:"7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //7 days
        httpOnly:true, //accessible only by web server
        sameSite:"strict",//prevent CSRF
        secure: process.env.NODE_ENV === "production" ? true : false, //https
    } );

    return token;
    
}