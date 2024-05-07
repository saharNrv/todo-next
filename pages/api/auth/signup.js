import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const { default: connectToDB } = require("@/configs/db");
const { default: userModel } = require("@/models/User");

const handler = async (req, res) => {


    if (req.methode !== 'POST') {
        return res.status(421).json({ message: ' Misdirected Request' });
    }

    try {
        connectToDB()

        const { name, username, email, password } = req.body

        //validation
        if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {

            return res.status(422).json({ message: 'Data is not valid !!' })
        }

        //check if user exists

        const userExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })
        if (userExists) {
            return res.status(422).json({ message: 'User already exists !!' })
        }

        //hash password

        const hashedPassword = await hashPassword(password)

        //token
        const token = generateToken({ email })

        //check "USER" or "ADMIN" role
        const user = await userModel.find({})

        await userModel.create({
            name,
            username,
            email,
            password: hashedPassword,
            role: user.length > 0 ? "USER" : "ADMIN",
        })

        return res.setHeader(
            "Set-Cookie",
            serialize(
                'token',
                token, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24
            }
            )
        ).status(201).json({ message: 'User Created Successfully :))' })

    } catch (err) {
        return res.status(500).json({ message: 'Server internally error' });
    }

}

export default handler