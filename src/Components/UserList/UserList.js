import React from "react";
import "./UserList.css";

function UserList({ users, onDeleteUser, onEditUser }) {
  return (
    <div className="user-list-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Kullanıcı Adı</th>
            <th>Email</th>
            <th>Telefon</th>
            <th>Web Sitesi</th>
            <th>Şirket</th>
            <th>Şehir</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.website}</td>
              <td>{u.company?.name || "-"}</td>
              <td>{u.address?.city || "-"}</td>
              <td>
                <button className="edit" onClick={() => onEditUser(u)}>
                  Düzenle
                </button>
                <button className="delete" onClick={() => onDeleteUser(u.id)}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
