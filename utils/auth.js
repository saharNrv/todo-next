import { sign, verify } from "jsonwebtoken"

const { hash, compare } = require("bcryptjs")

const hashPassword = async (password) => {

   const hashedPassword = await hash(password, 12)
   return hashedPassword

}

const generateToken = (data) => {
   const token = sign({ ...data }, process.env.privateKey, {
      expiresIn: '24'
   })
   return token
}

const veryfirePassword = async (password, hashedPassword) => {
   const isValid = await compare(password, hashedPassword)
   return isValid

}

const veryfireToken = (token) => {

   try {
      const veryfiredToken = verify(token, process.env.privateKey)
      return veryfiredToken
   } catch (err) {
      console.log("Verify Token Error =>", err);
      return false;
   }
}
export { hashPassword, generateToken, veryfirePassword, veryfireToken }