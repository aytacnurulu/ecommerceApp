// src/features/profile/pages/Addresses.jsx
import { useState } from "react";
import styles from "./Addresses.module.css";

const INITIAL_ADDRESSES = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    name: "John Doe",
    phone: "+994 50 123 45 67",
    line1: "123 Nizami Street, Apt 4B",
    city: "Baku",
    country: "Azerbaijan",
    zip: "AZ1000",
  },
  {
    id: 2,
    label: "Work",
    isDefault: false,
    name: "John Doe",
    phone: "+994 55 987 65 43",
    line1: "45 Istiqlaliyyat Street",
    city: "Baku",
    country: "Azerbaijan",
    zip: "AZ1001",
  },
];

const LABEL_ICONS = { Home: "🏠", Work: "🏢", Other: "📌" };
const EMPTY_FORM = {
  label: "Home",
  name: "",
  phone: "",
  line1: "",
  city: "",
  country: "",
  zip: "",
};

function AddressCard({ addr, onSetDefault, onDelete, onEdit }) {
  return (
    <div
      className={`${styles.card} ${addr.isDefault ? styles.cardDefault : ""}`}
    >
      {addr.isDefault && <div className={styles.defaultBadge}>✓ Default</div>}

      <div className={styles.cardTop}>
        <span className={styles.labelTag}>
          {LABEL_ICONS[addr.label] || "📌"} {addr.label}
        </span>
        <div className={styles.cardActions}>
          <button className={styles.editBtn} onClick={() => onEdit(addr)}>
            Edit
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDelete(addr.id)}
          >
            Delete
          </button>
        </div>
      </div>

      <div className={styles.name}>{addr.name}</div>
      <div className={styles.phone}>{addr.phone}</div>
      <div className={styles.line}>{addr.line1}</div>
      <div className={styles.line}>
        {addr.city}, {addr.country} {addr.zip}
      </div>

      {!addr.isDefault && (
        <button
          className={styles.setDefaultBtn}
          onClick={() => onSetDefault(addr.id)}
        >
          Set as Default
        </button>
      )}
    </div>
  );
}

export default function Addresses() {
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.line1.trim()) e.line1 = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    return e;
  }

  function handleSave() {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    if (editId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, ...form } : a)),
      );
    } else {
      const isFirst = addresses.length === 0;
      setAddresses((prev) => [
        ...prev,
        { ...form, id: Date.now(), isDefault: isFirst },
      ]);
    }
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
  }

  function handleEdit(addr) {
    setForm({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      line1: addr.line1,
      city: addr.city,
      country: addr.country,
      zip: addr.zip,
    });
    setEditId(addr.id);
    setErrors({});
    setShowForm(true);
  }

  function handleDelete(id) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSetDefault(id) {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
  }

  function handleCancel() {
    setShowForm(false);
    setForm(EMPTY_FORM);
    setEditId(null);
    setErrors({});
  }

  const field = (key, label, placeholder) => (
    <div className={styles.formGroup}>
      <label className={styles.formLabel}>{label}</label>
      <input
        className={`${styles.formInput} ${errors[key] ? styles.inputError : ""}`}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
      {errors[key] && <span className={styles.errorMsg}>{errors[key]}</span>}
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>My Addresses</h2>
        {!showForm && (
          <button
            className={styles.addBtn}
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm(EMPTY_FORM);
            }}
          >
            + Add New Address
          </button>
        )}
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>
            {editId ? "✏️ Edit Address" : "➕ New Address"}
          </h3>

          {/* Label picker */}
          <div className={styles.labelPicker}>
            {["Home", "Work", "Other"].map((l) => (
              <button
                key={l}
                className={`${styles.labelBtn} ${form.label === l ? styles.labelBtnActive : ""}`}
                onClick={() => setForm({ ...form, label: l })}
              >
                {LABEL_ICONS[l]} {l}
              </button>
            ))}
          </div>

          <div className={styles.formGrid}>
            {field("name", "Full Name", "e.g. John Doe")}
            {field("phone", "Phone", "e.g. +994 50 000 00 00")}
            {field("line1", "Street Address", "e.g. 123 Nizami St, Apt 4")}
            {field("city", "City", "e.g. Baku")}
            {field("country", "Country", "e.g. Azerbaijan")}
            {field("zip", "ZIP / Postal", "e.g. AZ1000")}
          </div>

          <div className={styles.formActions}>
            <button className={styles.saveBtn} onClick={handleSave}>
              {editId ? "Save Changes" : "Add Address"}
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Address cards ── */}
      {addresses.length === 0 && !showForm ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📍</div>
          <p>No saved addresses yet.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              addr={addr}
              onSetDefault={handleSetDefault}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
