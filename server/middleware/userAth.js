import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) => {
    const { token } = req.cookies

    try {
        if (!token) {
            return res.json({ success: false, message: "Not Authorized plz Login" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.id) {
            req.user = { id: decoded.id }
        } else {
            return res.json({ success: false, message: 'Plz Login Again' })
        }

        next();

    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default userAuth;
