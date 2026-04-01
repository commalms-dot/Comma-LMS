"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import styles from "@/components/Profile/profile.module.css";
import UserInfo from "@/components/Profile/UserInfo";
import Enrollments from "@/components/Profile/Enrollments";
import Wishlist from "@/components/Profile/Wishlist";
import Notes from "@/components/Profile/Notes";
import EditInfo from "@/components/Profile/EditInfo";

// Simple Skeleton component
const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`${className} animate-pulse bg-gray-300 dark:bg-gray-700 rounded`}
  />
);

// Dummy notes
const dummyNotes = [
  {
    courseId: 1,
    courseTitle: "React Fundamentals",
    notes: [
      {
        video: "Intro to Components",
        text: "Prefer functional components + hooks",
        id: "n1",
      },
      {
        video: "State & Props",
        text: "Lift state up when siblings need same data",
        id: "n2",
      },
    ],
  },
  {
    courseId: 2,
    courseTitle: "Advanced JavaScript",
    notes: [
      {
        video: "Closures",
        text: "Example: keep private state in factory fn",
        id: "n3",
      },
    ],
  },
];

// User type
interface User {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  role?: string | null;
  createdAt?: string | null;
}

export default function ProfilePage() {
  const { token, userId, user: storedUser } = useAuthStore();

  const [user, setUser] = useState<User | null>(storedUser ?? null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(!storedUser);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // Helper to get initials
  const getInitials = (
    name?: string,
    firstName?: string,
    lastName?: string,
  ) => {
    if (name)
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    if (firstName || lastName)
      return (
        `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "?"
      );
    return "?";
  };

  useEffect(() => {
    if (!token || !userId) return;

    setLoading(true);

    // Fetch user
    if (!storedUser) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setUser)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }

    // Fetch enrollments
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setEnrollments)
      .catch(console.error);

    // Fetch wishlist
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setWishlist(data.data))
      .catch(console.error)
      .finally(() => setWishlistLoading(false));
  }, [token, userId, storedUser]);

  // Skeleton screen
  if (loading || !user) {
    return (
      <main className={styles.page}>
        <div className={styles.header}>
          <Skeleton className="h-20 w-full" />
        </div>
        <div className={styles.grid}>
          <section className={styles.left}>
            <Skeleton className="h-64 mb-6" />
            <Skeleton className="h-64 mb-6" />
            <Skeleton className="h-64" />
          </section>
          <section className={styles.right}>
            <Skeleton className="h-64 mb-6" />
            <Skeleton className="h-64" />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.avatar}>
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName || "User"} />
            ) : (
              <div className={styles.initials}>
                {getInitials(
                  user.fullName ?? "",
                  user.firstName ?? "",
                  user.lastName ?? "",
                )}
              </div>
            )}
          </div>

          <div>
            <h1 className={styles.title}>
              {user.fullName ||
                `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}
            </h1>
            <p className={styles.subtitle}>
              {user.role ?? "Member"} • Joined{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.left}>
          <UserInfo user={user} />
          <Enrollments enrollments={enrollments} isLoading={false} />
          <div style={{ marginTop: 16 }}>
            <Wishlist wishlist={wishlist} isLoading={wishlistLoading} />
          </div>
        </section>

        <section className={styles.right}>
          <Notes notes={dummyNotes} />
          <EditInfo user={user} />
        </section>
      </div>
    </main>
  );
}
