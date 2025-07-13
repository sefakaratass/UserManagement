import React from "react";
import "./Navbar.css";

function Navbar({ onAddClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Kullanıcı Yönetimi</div>
      <button className="btn-add" onClick={onAddClick}>
        + Yeni Kullanıcı Ekle
      </button>
    </nav>
  );
}

export default Navbar;
