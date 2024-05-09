"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Header from "./Header";
import Listing from "./Listing";
import { addUser, getUsers } from "@/app/action";
import { AddUser, User } from "@/types";
import { toast } from "react-hot-toast";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const modalChange = () => {
    setShowModal((prev) => !prev);
  };

  const getUsersData = async () => {
    try {
      const data = await getUsers();
      console.log(data, "data");
      setUsers(data);
    } catch (error) {
      console.log(error, "Error while fetching");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const onAddUser = async (user: AddUser) => {
    if (users) {
      const res = await addUser(user);
      if (res?.error) {
        toast.error(res?.error);
      }
      if (res?.success) {
        toast.success(res?.success);
        getUsersData();
        setShowModal(false);
      }
    }
  };

  return (
    <div>
      <Header onChange={modalChange} />
      <Listing users={users} getUsers={getUsersData} />
      {showModal && <Modal onChange={modalChange} onSuccess={onAddUser} />}
    </div>
  );
}
