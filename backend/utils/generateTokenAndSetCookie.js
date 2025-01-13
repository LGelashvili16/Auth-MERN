import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // JS cannot access the cookie
    secure: process.env.NODE_ENV === "production", // send only over https
    sameSite: "strict", // csrf
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
