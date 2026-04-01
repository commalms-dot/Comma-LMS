"use client";
import CourseList from "@/components/Courses/CourseList/CourseList";
import React from "react";
import styles from "./TraineePage.module.css";
import Image from "next/image";
import AddToCartPopUp from "@/features/Cart/components/AddToCartPopup/AddToCartPopup";
const TraineePage = () => {
  return (
    <div>
      <div className={`container ${styles["hero"]}`}>
        <div className={styles["image-container"]}>
          <Image src="/images/trainee-hero.png" alt="hero" fill={true} />
        </div>
        {/* <AddToCartPopUp
          description="Using XD to get a job in UI Design, User Interface, User Experience design, UX design & Web Design."
          length={60}
          status="Best Seller"
          title="Ultimate AWS Certified Developer Associate."
          updated_at="2021-09-01"
        /> */}
      </div>
      <article className={`${styles.content} container`}>
        <h3 className={styles["section-header"]}>Enrolled Courses</h3>
        <CourseList enrolled={true} />
        <h3 className={styles["section-header"]}>Viewed Courses</h3>
        <CourseList viewed={true} />
      </article>
    </div>
  );
};
export default TraineePage;
