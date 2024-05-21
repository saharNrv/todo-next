import userModel from "@/models/User"
import { veryfireToken } from "@/utils/auth"

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    try {
        const { token } = req.cookies
        
console.log('token me',token);

        if (!token) {
            return res.status(401).json({ message: 'You are not login ccc!' })
        }

        const tokenPayload = veryfireToken(token)
        console.log('veryfireToken', tokenPayload);

        if (!tokenPayload) {
            return res.status(401).json({ message: 'You are not login token !' })
        }

        const user = await userModel.findOne({
            email: tokenPayload.email

        }, "name  role")
        console.log('user me', user);

        return res.status(200).json({ data: user });

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export default handler