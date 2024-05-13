import * as jwt from "jsonwebtoken";
import { setCookie } from "./cookies";
import { User } from "@/types";

export const generateToken = (user: User) => {
  const accessToken = jwt.sign(
    {
      user: {
        email: user.email,
        id: user?.id,
        username: user?.name,
        isAdmin: user?.isadmin,
      },
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "1h" }
  );
  setCookie("token", accessToken);
};
