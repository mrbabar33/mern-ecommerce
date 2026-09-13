import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
	try {
		const authorization = req.headers.authorization;

		if (!authorization || !authorization.startsWith("Bearer ")) {
			return res.status(401).json({ success: false, message: "Admin authorization required" });
		}

		const token = authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (decoded.role !== "admin") {
			return res.status(403).json({ success: false, message: "Admin access required" });
		}

		req.admin = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ success: false, message: "Invalid or expired admin token" });
	}
};

export default adminAuth;
