"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button/Button";
import { useAuthStore } from "@/store/authStore";
import "./CourseEnrollSection.css";
import { formatDuration } from "@/utils/formatDuration";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface CourseEnrollSectionProps {
  courseId: number;
  courseName: string;
  isUserAlreadyEnrolled: boolean;
  cost: number;
  instructorName: string;
  level: string;
  rate: number;
  duration: number;
}

const CourseEnrollSection: React.FC<CourseEnrollSectionProps> = ({
  courseId,
  courseName,
  isUserAlreadyEnrolled,
  cost,
  instructorName,
  level,
  rate,
  duration,
}) => {
  const [enrolled, setEnrolled] = useState(isUserAlreadyEnrolled);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthStore();
  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: courseName,
          text: `Check out this course: ${courseName}`,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Share failed or cancelled", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Course link copied to clipboard");
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    }
  };

  const handleEnroll = async () => {
    if (!token) {
      toast.warn("Please login first to enroll in this course!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/enrollments/course/${courseId}/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type: "MONTHLY" }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enroll");
      }

      const data = await response.json();
      console.log("Enrollment successful:", data);
      toast.success("You are now enrolled in this course!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setEnrolled(true);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-enroll-section">
      <div className="course-enroll-section__header">
        <p className="course-enroll-section__course-name">{courseName}</p>

        <div className="course-enroll-section__action-group">
          {/* Save */}
          <Button
            variant="transparent"
            className="course-enroll-section__action-btn"
            onClick={() => console.log("Save clicked")}
          >
            <Image
              src="/svg/save.svg"
              alt="save icon"
              width={22}
              height={22}
              priority
            />
            <span>Save</span>
          </Button>

          {/* Share */}
          <Button
            variant="transparent"
            className="course-enroll-section__action-btn"
            onClick={handleShare}
          >
            <Image
              src="/svg/share-dark.svg"
              alt="share icon"
              width={22}
              height={22}
              priority
            />
            <span>Share</span>
          </Button>
        </div>
      </div>

      <div className="course-enroll-section__content">
        <div>
          <span>Instructor Name&nbsp;:&nbsp;</span>
          <span>{instructorName}</span>
        </div>
        <div>
          <span>Instructor Level&nbsp;:&nbsp;</span>
          <span>{level}</span>
        </div>
        <div>
          <span>Duration&nbsp;:&nbsp;</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      <Button
        className="course-enroll-section__enroll-btn"
        variant="secondary"
        size="full"
        onClick={handleEnroll}
        disabled={enrolled || loading}
      >
        {enrolled ? "Enrolled" : loading ? "Enrolling..." : "Enroll"}
      </Button>
    </div>
  );
};

export default CourseEnrollSection;
