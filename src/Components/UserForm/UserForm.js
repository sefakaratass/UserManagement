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
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn"
    >
      <h2 className="text-xl font-bold text-center mb-4">
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
        <div key={field.name} className="flex flex-col">
          <label className="mb-1 font-medium">{field.label}</label>
          <input
            name={field.name}
            type={field.type}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold shadow hover:shadow-md transition-all duration-200"
      >
        {editingUser ? "Güncelle" : "Kaydet"}
      </button>
    </form>
  );
}

export default UserForm;
