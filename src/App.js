import React, { useEffect, useState } from "react";
import { getUsers } from "./data/api";
import Navbar from "./Components/Navbar/Navbar";
import UserList from "./Components/UserList/UserList";
import UserForm from "./Components/UserForm/UserForm";
import Modal from "./Components/Modal/Modal";

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
    setUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddClick={() => setIsModalOpen(true)} />

      <UserList
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
      >
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
