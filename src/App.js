import React, { useEffect, useState } from "react";
import { getUsers } from "./data/api";
import Modal from "./Components/Modal/Modal";
import UserList from "./Components/UserList/UserList";
import UserForm from "./Components/UserForm/UserForm";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...newUser, id: prevUsers.length + 1 },
    ]);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="app-container">
      <Navbar
        onAddClick={() => {
          setEditingUser(null);
          setIsModalOpen(true);
        }}
      />

      <UserList
        users={users}
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          onAddUser={handleAddUser}
          onUpdateUser={handleUpdateUser}
          editingUser={editingUser}
        />
      </Modal>
    </div>
  );
}
export default App;
