"use server";

import EndPoints from "@/constants/endpoints";
import { db } from "@/lib/db";
import { AddUser, LoginUser, User } from "@/types";
import { removeCookie, setCookie } from "@/utils/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { generateToken } from "@/utils";

export async function generateContent() {
  console.log("FormSubmit Done");
}

export async function adminLogin(formData: LoginUser) {
  const { email, password } = formData;
  console.log("ADMIN LOGIN api called..");
  const user = await db?.user?.findUnique({ where: { email } });
  if (!user) {
    return { error: "Email not found!" };
  }

  // Check the role.
  const isAdmin = user?.isadmin;
  if (!isAdmin) {
    return { error: "Sorry, you are not Admin!" };
  }

  // compare the password
  const isPassMatched = await bcrypt.compare(password, user?.password);

  if (isPassMatched) {
    generateToken(user);
    return {
      success: "User logged in successfully!",
    };
  }
  return { error: "Invalid credentials!" };
}

export async function getUsers() {
  return await db.user?.findMany({
    select: {
      email: true,
      name: true,
      id: true,
      isadmin: true,
      status: true,
    },
  });
}

export async function addUser(user: AddUser) {
  const { email, password } = user;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) return { error: "User already exists" };
  await db?.user.create({
    data: { ...user, password: hashedPassword },
  });
  return { success: "User added successfully" };
}

export async function removeUser(id: string) {
  const res = await db?.user?.delete({
    where: { id },
  });
  if (res) {
    return { success: "User deleted successfully" };
  }

  return { error: "Error deleting user." };
}

export async function updateUser(user: User) {
  console.log(user, "user");
  const res = await db?.user?.update({
    where: { id: user.id },
    data: user,
  });
  if (res) {
    return { success: "User updated successfully" };
  }
  return { error: "Error updating user!" };
}

export async function userLogin(formData: LoginUser) {
  const { email, password } = formData;

  // Check the user is available or not.
  const currentUser = await db.user?.findUnique({ where: { email } });
  if (!currentUser) {
    return { error: "User not found!!" };
  }

  // Match the pasword.
  const isPassMatched = await bcrypt.compare(password, currentUser?.password);
  if (!isPassMatched) {
    return { error: "Invalid Credentials!" };
  }
  generateToken(currentUser);

  return { success: "User logged in successfully!" };
}

export async function logout() {
  removeCookie("token");
  redirect("/login");
}

export async function forgotPassword(formData: { email: string }) {
  const url = EndPoints?.forgotPassword;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await res?.json();
  return data;
}

export async function resetPassword(formData: {
  password: string;
  token: string;
}) {
  const url = EndPoints?.resetPassword;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  return data;
}

export async function longFormSubmit(formData: FormData) {
  const id = cookies().get("userId")?.value;
  formData.append("user_id", id as string);
  const url = EndPoints?.longForm;
  const res = await fetch(url, {
    method: "POST",
    // headers: { "Content-Type": "multipart/form-data" },
    body: formData,
  });
  const data = await res.json();
  return data;
}
