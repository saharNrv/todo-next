const { default: connectToDB } = require("@/configs/db")
const { default: userModel } = require("@/models/User")
const { veryfirePassword, generateToken } = require("@/utils/auth")

const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        connectToDB()
        const { identifier, password } = req.body

        if (!identifier.trim() || !password.trim()) {
            return res.status(400).json({ message: 'All fields are required' })
        }


        const user = await userModel.findOne({
            $or: [{ username: identifier }, { email: identifier }]
        })
        if (!user) {
            return res.status(404).json({ message: "User not found !!" });
        }

        const validPassword = veryfirePassword(password, user.password)
        if (!validPassword) {
            return res
                .status(422)
                .json({ message: "username or password is not correct !!" });
        }

        const token = generateToken({ email: user.email })
        return res
            .setHeader(
                "Set-Cookie",
                serialize("token", token, {
                    httpOnly: true,
                    path: "/",
                    maxAge: 60 * 60 * 24,
                })
            )
            .status(200)
            .json({ message: "User Logged In Successfully :))" });


    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}