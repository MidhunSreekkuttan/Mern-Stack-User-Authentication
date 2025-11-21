import userModel from "../data-base/models/userModel.js";


export const getUser = async (req, res) => {
    const userId = req.user.id

    try {

        const user = await userModel.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User Not Found Plz Login" })
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isVerified: user.isVerified
            }
        })

    } catch (error) {

        return res.status(401).json({ success: false, message: error.message });

    }
}