"use client";
import React from "react";
import styles from "./UserInfo.module.css";

interface User {
  id: string;
  fullName?: string | null;
  email?: string | null;
  mobile?: string | null;
  nationality?: string | null;
  organization?: string | null;
  discipline?: string | null;
  graduationYear?: string | number | null;
  yearsOfTrainingExperience?: number | null;
  gender?: string | null;
  linkedinUrl?: string | null;
  facebookUrl?: string | null;
  avatarUrl?: string | null;
  role?: string | null;
  country?: string | null;
  createdAt?: string | null;
}

export default function UserInfo({ user }: { user: User }) {
  // Fields to show in the card
  const fields = [
    { label: "Full Name", value: user.fullName },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.mobile },
    // { label: "Nationality", value: user.nationality },
    // { label: "Organization", value: user.organization },
    // { label: "Discipline", value: user.discipline },
    // { label: "Graduation Year", value: user.graduationYear },
    // { label: "Experience (years)", value: user.yearsOfTrainingExperience },
    // { label: "Gender", value: user.gender },
    // { label: "LinkedIn", value: user.linkedinUrl },
    // { label: "Facebook", value: user.facebookUrl },
    // { label: "Country", value: user.country },
    // { label: "Role", value: user.role },
    // {
    //   label: "Joined",
    //   value: user.createdAt
    //     ? new Date(user.createdAt).toLocaleDateString()
    //     : null,
    // },
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Information</h3>
      </div>

      {fields.map((f) => (
        <div className={styles.row} key={f.label}>
          <div className={styles.label}>{f.label}</div>
          <div className={styles.value}>{f.value || "—"}</div>
        </div>
      ))}
    </div>
  );
}
