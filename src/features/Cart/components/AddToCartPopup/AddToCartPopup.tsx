"use client";

import React, { useState } from "react";
import styles from "./AddToCartPopUp.module.css";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/store/authStore";

type Props = {
  title: string;
  status?: string;
  updated_at: string;
  length: number;
  description: string;
  courseId: number;
};

export default function AddToCartPopUp({
  title,
  status,
  updated_at,
  length,
  description,
  courseId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [message, setMessage] = useState("");

  // Get the token from your auth store
  const { token } = useAuthStore();

  const handleEnroll = async () => {
    if (!token) {
      setMessage("You must be logged in to enroll.");
      return;
    }

    // Ensure courseId is valid
    const numericCourseId = Number(courseId);
    if (isNaN(numericCourseId)) {
      setMessage("Invalid course ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments/course/${numericCourseId}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: "MONTHLY", // adjust if your API expects something else
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setEnrolled(true);
        setMessage(data.message || "Successfully enrolled!");
      } else {
        setMessage(data.message || "Failed to enroll");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while enrolling");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.card}>
      <p className={styles.header}>{title}</p>

      <div className={styles.info}>
        {status && <p className={styles.statusBadge}>{status}</p>}
        <p className={styles.lastUpdated}>Updated at {updated_at}</p>
      </div>

      <div className={styles.body}>
        <p className={styles.duration}>{length} hours total</p>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.actions}>
        <Button
          variant="accent"
          size="medium"
          onClick={(e) => {
            e.stopPropagation();
            handleEnroll();
          }}
          disabled={loading || enrolled}
        >
          {loading ? "Enrolling..." : enrolled ? "Enrolled" : "Enroll"}
        </Button>
      </div>

      {message && <p className={styles.message}>{message}</p>}
    </section>
  );
}
