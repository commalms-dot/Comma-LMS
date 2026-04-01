"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, Users, ArrowRight } from "lucide-react";
import styles from "./InstructorCard.module.css";

interface InstructorCardProps {
  id?: string;
  name?: string;
  coursesCount?: number;
  reviewsCount?: number;
  jobTitle?: string;
  organization?: string;
  avatarUrl?: string | null;
  loading?: boolean; // skeleton state
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  id,
  name = "Unknown Instructor",
  coursesCount = 0,
  reviewsCount = 0,
  jobTitle = "",
  organization = "",
  avatarUrl,
  loading = false,
}) => {
  const router = useRouter();

  const safeAvatarUrl = avatarUrl?.trim() ? avatarUrl : "/images/default-avatar.png";

  if (loading) {
    return (
      <div className={`${styles.card} ${styles.skeletonCard}`}>
        <div className={`${styles.imageWrapper} ${styles.skeleton}`}></div>
        <div className={styles.content}>
          <div className={`${styles.info}`}>
            <div className={`${styles.skeleton} ${styles.skeletonName}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
          </div>
          <div className={styles.stats}>
            <div className={`${styles.skeleton} ${styles.skeletonStat}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonStat}`}></div>
          </div>
          <div className={`${styles.skeleton} ${styles.skeletonFooter}`}></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
      onClick={() => id && router.push(`/instructors/${id}`)}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={safeAvatarUrl}
          alt={name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {organization && <div className={styles.badge}>{organization}</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          {jobTitle && <p className={styles.title}>{jobTitle}</p>}
        </div>

        <div className={styles.stats}>
          {coursesCount !== undefined && (
            <div className={styles.statItem}>
              <Users size={14} />
              <span>{coursesCount} Sessions</span>
            </div>
          )}
          {reviewsCount !== undefined && (
            <div className={styles.statItem}>
              <Star size={14} className={styles.starIcon} />
              <span>{reviewsCount}</span>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <span>View Profile</span>
          <ArrowRight size={16} className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
