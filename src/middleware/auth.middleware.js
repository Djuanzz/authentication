import jwt from "jsonwebtoken";
import { prisma } from "../db/database.js";

const authMiddleware = async (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    return res.status(401).json({
      message: "unauthenticated user",
    });
  }

  try {
    const claim = jwt.verify(cookie, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: claim.id,
      },
    });

    console.log(user);

    if (!user) {
      return res.status(401).json({
        message: "unauthenticated user",
      });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      //   password: user.password,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "unauthenticated user",
    });
  }
};

const adminMiddleware = async (req, res, next) => {
  const role = req.user.role.toUpperCase();
  if (role !== "ADMIN") {
    return res.status(403).json({
      message: "forbidden access",
    });
  }

  next();
};

export { authMiddleware, adminMiddleware };
