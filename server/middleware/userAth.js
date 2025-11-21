import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { userDate } = req.cookies

    try {
        if (!userDate) {
            return res.status(401).json({ success: false, message: "Not Authorized plz Login" });
        }

        const decoded = jwt.verify(userDate, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.json({ success: false, message: "plz Login again" })
        }

        req.user = { id: decoded.id }

        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
