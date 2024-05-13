"use client";

import { User } from "@/types";
import Image from "next/image";
import { Badge } from "./ui/badge";
import DeleteModal from "./DeleteModal";

interface PropTypes {
  user: User;
  onDelete: (arg: User) => void;
  onEditChange: (arg: User) => void;
}

const UserRow = ({ user, onDelete, onEditChange }: PropTypes) => {
  return (
    <>
      <tr>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">3</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">{user?.name}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <p className="whitespace-no-wrap">{user?.email}</p>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <Badge>{user?.isadmin ? "Admin" : "User"}</Badge>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <Badge className="capitalize" variant={"outline"}>
            {user?.status}
          </Badge>
        </td>
        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
          <ul className="text-sm flex items-center gap-2">
            <li>
              <button
                type="button"
                className="flex w-full items-center justify-center py-2 px-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200"
                onClick={() => onEditChange(user)}
              >
                <Image
                  src={"/assets/edit.svg"}
                  alt="edit icon"
                  width={15}
                  height={15}
                />
              </button>
            </li>
            <li>
              <DeleteModal onSuccess={() => onDelete(user)} />
            </li>
          </ul>
        </td>
      </tr>
    </>
  );
};

export default UserRow;
