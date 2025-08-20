import React from "react";
function UserList({ users, onDeleteUser, onEditUser }) {
  return (
    <div className="w-full h-full p-4">
      {/* Desktop Tablo */}
      <div className="hidden md:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Ad</th>
              <th className="p-2 border">Kullanıcı Adı</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Telefon</th>
              <th className="p-2 border">Web Sitesi</th>
              <th className="p-2 border">Şirket</th>
              <th className="p-2 border">Şehir</th>
              <th className="p-2 border">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-100 transition-colors">
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.phone}</td>
                <td className="p-2 border">{u.website}</td>
                <td className="p-2 border">{u.company?.name || "-"}</td>
                <td className="p-2 border">{u.address?.city || "-"}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    onClick={() => onEditUser(u)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    onClick={() => onDeleteUser(u.id)}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Kart */}
      <div className="md:hidden flex flex-col space-y-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <p>
              <strong>ID:</strong> {u.id}
            </p>
            <p>
              <strong>Ad:</strong> {u.name}
            </p>
            <p>
              <strong>Kullanıcı Adı:</strong> {u.username}
            </p>
            <p>
              <strong>Email:</strong> {u.email}
            </p>
            <p>
              <strong>Telefon:</strong> {u.phone}
            </p>
            <p>
              <strong>Web Sitesi:</strong> {u.website}
            </p>
            <p>
              <strong>Şirket:</strong> {u.company?.name || "-"}
            </p>
            <p>
              <strong>Şehir:</strong> {u.address?.city || "-"}
            </p>
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                onClick={() => onEditUser(u)}
              >
                Düzenle
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                onClick={() => onDeleteUser(u.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
