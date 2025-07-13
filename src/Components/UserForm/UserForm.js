import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function UserForm({ onAddUser, onUpdateUser, editingUser }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Ad gerekli"),
      username: Yup.string().required("Kullanıcı adı gerekli"),
      email: Yup.string()
        .email("Geçerli email giriniz")
        .required("Email gerekli"),
      phone: Yup.string().required("Telefon gerekli"),
      website: Yup.string()
        .url("Geçerli bir URL giriniz")
        .required("Web sitesi gerekli"),
      company: Yup.string().required("Şirket adı gerekli"),
      city: Yup.string().required("Şehir gerekli"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userData = {
        ...values,
        company: { name: values.company },
        address: { city: values.city },
      };
      if (editingUser) {
        userData.id = editingUser.id;
        onUpdateUser(userData);
      } else {
        onAddUser(userData);
      }
      resetForm();
    },
  });

  useEffect(() => {
    if (editingUser) {
      formik.setValues({
        name: editingUser.name || "",
        username: editingUser.username || "",
        email: editingUser.email || "",
        phone: editingUser.phone || "",
        website: editingUser.website || "",
        company: editingUser.company?.name || "",
        city: editingUser.address?.city || "",
      });
    } else {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingUser]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 style={{ marginBottom: "20px" }}>
        {editingUser ? "Kullanıcı Düzenle" : "Yeni Kullanıcı Ekle"}
      </h2>

      {[
        { label: "Ad", name: "name", type: "text" },
        { label: "Kullanıcı Adı", name: "username", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Telefon", name: "phone", type: "text" },
        { label: "Web Sitesi", name: "website", type: "text" },
        { label: "Şirket Adı", name: "company", type: "text" },
        { label: "Şehir", name: "city", type: "text" },
      ].map((field) => (
        <div key={field.name} style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            {field.label}
          </label>
          <input
            name={field.name}
            type={field.type}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div style={{ color: "red", marginTop: "4px" }}>
              {formik.errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "#3f51b5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {editingUser ? "Güncelle" : "Kaydet"}
      </button>
    </form>
  );
}

export default UserForm;
