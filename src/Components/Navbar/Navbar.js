import React from "react";

function Navbar({ onAddClick }) {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
        <div className="space-x-4">
          <button
            onClick={onAddClick}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 shadow hover:shadow-md transition-all duration-300"
          >
            + Yeni Kullanıcı Ekle
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
