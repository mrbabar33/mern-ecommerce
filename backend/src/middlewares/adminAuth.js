import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || req.headers.token;

		if (!authHeader) {
			return res.status(401).json({ success: false, message: "Admin authorization required" });
		}

		const token = authHeader.startsWith("Bearer ")
			? authHeader.split(" ")[1]
			: authHeader;

		if (!token) {
			return res.status(401).json({ success: false, message: "Admin authorization required" });
		}

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
