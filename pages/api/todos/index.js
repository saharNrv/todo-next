import connectToDB from "@/configs/db"
import todoModel from "@/models/Todo"
import userModel from "@/models/User"
import { veryfireToken } from "@/utils/auth"

const handler = async (req, res) => {

    connectToDB()

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: 'You are not login !!' })
    }
    const tokenPayload = veryfireToken(token)
    if (!tokenPayload) {
        return res.status(401).json({ message: 'You are not login !!' })

    }

    const user = await userModel.findOne({
        email: tokenPayload.email
    })

    if (req.method === 'GET') {

        const todos = await todoModel.find({
            user: user._id
        })
        return res.json(todos)
    } else if (req.method === 'POST') {

        const { title, isCompleted } = req.body

        const newTodo = {
            title,
            isCompleted,
            user: user._id
        }

        await todoModel.create(newTodo)

        return res.status(201).json({ message: "Todo Created Successfully :))" });
        
    }else{
        
      
        return res.status(400).json({ message: "err" });

    }

}

export default handler