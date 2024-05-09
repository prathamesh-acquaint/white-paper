"use client";

import { logout } from "@/app/action";
import { Button } from "./ui/button";

const LogoutBtn = () => {
  "use client";
  const onLogout = () => {
    logout();
  };
  return (
    <Button variant={"outline"} onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
