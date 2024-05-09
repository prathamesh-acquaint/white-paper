import { removeUser, updateUser } from "@/app/action";
import DeleteModal from "@/components/DeleteModal";
import Modal from "@/components/Modal";
import UserRow from "@/components/UserRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface PropTypes {
  users: User[] | null;
  getUsers: any;
}

const Listing = ({ users, getUsers }: PropTypes) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const deleteUser = async (user: User | null) => {
    const { error, success } = await removeUser(user?.id as string);
    if (success) {
      getUsers();
      setShowDeleteModal(false);
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  };

  const editUser = async (user: User) => {
    const { error, success } = await updateUser(user);
    if (success) {
      getUsers();
      setShowEditModal(false);
      toast.success(success);
    }
    if (error) {
      toast.error(error);
    }
  };

  const onDeleteModalChange = async (user: User | null) => {
    setActiveUser(user);
    setShowDeleteModal((prev) => !prev);
  };

  const onEditModalChange = (user: User) => {
    setActiveUser(user);
    setShowEditModal((prev) => !prev);
  };

  if (!users) {
    return <h1>No Users..</h1>;
  }

  return (
    <>
      <div className="mx-auto w-full p-4 md:p-0 lg:max-w-screen-xl">
        <div className="pb-6 pt-6">
          <div>
            <h2 className="font-semibold text-xl tracking-wider text-gray-700 text-center">
              User Accounts
            </h2>
            <p className="text-xs text-gray-500 text-center">
              View accounts of registered users
            </p>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {users?.map((user, index) => (
                  <UserRow
                    key={index}
                    user={user}
                    onDelete={deleteUser}
                    onEditChange={onEditModalChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              Showing 1 to 5 of 12 Entries
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal
          onChange={onEditModalChange}
          onSuccess={editUser}
          values={activeUser as User}
        />
      )}
    </>
  );
};

export default Listing;
