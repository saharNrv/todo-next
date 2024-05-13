import { sign } from "jsonwebtoken"

const { hash, compare } = require("bcryptjs")

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

 const veryfirePassword = async (password, hashedPassword) =>{
   const isValid = await compare(password, hashedPassword)
   return isValid

 }

 export {hashPassword, generateToken, veryfirePassword}