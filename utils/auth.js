import { sign } from "jsonwebtoken"

const { hash } = require("bcryptjs")

 const hashPassword = async (password) => {

    const hashedPassword = await hash(password, 12)
    return hashedPassword

 } 

 const generateToken = (data)=>{
    const token = sign({...data}, process.env.privateKey, {
        expiresIn: '24'
    })
    return token
 }

 export {hashPassword, generateToken}