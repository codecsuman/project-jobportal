import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authenticated. Please login.",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.id = decoded.userId;
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Session expired or invalid token.",
      success: false,
    });
  }
};

export default isAuthenticated;
