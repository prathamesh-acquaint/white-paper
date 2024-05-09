import { cookies } from "next/headers";

export const setCookie = (name: string, value: string) => {
  // Set a cookie
  cookies().set(name, value, {
    // Set the expiration date
    expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });
};

export const removeCookie = (name: string) => {
  cookies().delete(name);
};
