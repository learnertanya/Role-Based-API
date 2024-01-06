const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json("Unauthorized");
        }

        // Verify user token
        try {
            const decodedUserToken = jwt.verify(token, "userSecretKey");
            // Redirect to user-specific route
            return res.redirect('/page/user/home');
        } catch (userTokenError) {
            // Verify admin token
            try {
                const decodedAdminToken = jwt.verify(token, "adminSecretKey");
                // Redirect to admin-specific route
                return res.redirect('/page/admin/home');
            } catch (adminTokenError) {
                // If neither user nor admin token is valid
                return res.status(401).json("Unauthorized");
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }
};
