import { UserModel } from "./Model.js"

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({
                statusCode: 404,
                message: "User Not Found With This Email"
            })
        }

        const isMatched = user.password === password

        if (!isMatched) {
            return res.json({
                statusCode: 401,
                message: "Invalid Credentials"
            })
        }

        return res.json({
            statusCode: 200,
            message: "Welcome Back",
            user
        })

    } catch (error) {
        return res.json({
            statusCode: 500,
            error: error.message

        })

    }
}

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await UserModel.create({ name, email, password });

    console.log(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
