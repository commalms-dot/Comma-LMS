"use client";

import React, { useState } from "react";
import styles from "./EditInfo.module.css";
import { useAuthStore } from "@/store/authStore";

export default function EditInfo({ user }: any) {
  const { token, userId, setAuth } = useAuthStore();

  const [form, setForm] = useState({
    name: user.fullName || "",
    email: user.email || "",
    phone: user.mobile || "",
    gender: user.gender || "",
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSave(e: any) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const updatedUser: any = { ...user };

      // 1️⃣ Change password (if provided)
      if (form.newPassword) {
        if (form.newPassword !== form.passwordConfirm) {
          setMessage("Passwords do not match");
          setLoading(false);
          return;
        }

        const passwordRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/change-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              currentPassword: form.currentPassword,
              newPassword: form.newPassword,
            }),
          },
        );

        if (!passwordRes.ok) {
          const data = await passwordRes.json().catch(() => ({}));
          throw new Error(data.message || "Failed to change password");
        }
      }

      // 2️⃣ Update email (if changed)
      if (form.email && form.email !== user.email) {
        const emailRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}/email`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newEmail: form.email }),
          },
        );

        if (!emailRes.ok) {
          const data = await emailRes.json().catch(() => ({}));
          throw new Error(data.message || "Failed to update email");
        }
        updatedUser.email = form.email;
      }

      // 3️⃣ Update other fields (name, phone, gender)
      const updatedFields: any = {};
      if (form.name && form.name !== user.fullName) {
        updatedFields.fullName = form.name;
        updatedUser.fullName = form.name;
      }
      if (form.phone && form.phone !== user.mobile) {
        updatedFields.mobile = form.phone;
        updatedUser.mobile = form.phone;
      }
      if (form.gender && form.gender !== user.gender) {
        updatedFields.gender = form.gender;
        updatedUser.gender = form.gender;
      }

      if (Object.keys(updatedFields).length > 0) {
        const infoRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields),
          },
        );

        if (!infoRes.ok) {
          const data = await infoRes.json().catch(() => ({}));
          throw new Error(data.message || "Failed to update user info");
        }
      }

      // 4️⃣ Update user in auth store (keep token unchanged)
      if (userId === null) throw new Error("User ID is missing"); // runtime check
      setAuth(token!, userId, updatedUser); // ✅ TS-safe: token may be string|null, userId is number

      setMessage("Saved successfully");
    } catch (err: any) {
      console.error(err);
      setMessage(err.message || "Failed to save changes");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Edit Information</h3>
      <form className={styles.form} onSubmit={onSave}>
        <label className={styles.label}>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Phone
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Gender
          <select
            name="gender"
            value={form.gender}
            onChange={onChange}
            className={styles.input}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label className={styles.label}>
          Current password
          <input
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          New password
          <input
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Confirm new password
          <input
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={onChange}
            className={styles.input}
          />
        </label>

        {message && <div className={styles.message}>{message}</div>}

        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
