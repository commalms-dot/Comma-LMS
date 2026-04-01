"use client";
import { useInstructorsQuery } from "@/services/instructor.service";
import InstructorCard from "../InstructorCard/InstructorCard";
import styles from "./InstructorList.module.css";
import React from "react";

interface InstructorsListProps {
  type?: string;
  category?: string;
  limit?: number;
}

const InstructorsList: React.FC<InstructorsListProps> = ({
  category,
  type,
  limit = 4,
}) => {
  const {
    data: instructors,
    isLoading,
    error,
  } = useInstructorsQuery({
    category,
    type,
    limit,
  });

  return (
    <section className={styles.containerSection}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.textStack}>
            <span className={styles.preTitle}>Our Experts</span>
            <h2 className={styles.mainTitle}>Meet Your Instructors</h2>
          </div>
          <button className={styles.exploreBtn}>Explore All Members</button>
        </div>

        <div className={styles.grid}>
          {isLoading ? (
            Array.from({ length: limit }).map((_, i) => (
              <InstructorCard key={i} loading={true} />
            ))
          ) : error ? (
            <div className={styles.loading}>Something went wrong.</div>
          ) : (
            instructors?.map((instructor: any) => (
              <InstructorCard key={instructor.id} {...instructor} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default InstructorsList;
