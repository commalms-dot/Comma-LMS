"use client";

import React, { useEffect, useState, useRef } from "react";
import CourseVideoDescription from "@/features/CoursePage/CourseVideoDescription/CourseVideoDescription";
import CourseContentSection from "@/features/CoursePage/CourseContentSection/CourseContentSection";
import CourseEnrollSection from "@/features/CoursePage/CourseEnrollSection/CourseEnrollSection";
import VideoPlayer, {
  VideoPlayerHandle,
} from "@/features/CoursePage/VideoPlayer/VideoPlayer";
import CourseReviewsSection from "@/features/CoursePage/CourseReviewsSection/CourseReviewsSection";
import AcquiredSkillsSection from "@/features/CoursePage/AcquiredSkillsSection/AcquiredSkillsSection";
import CourseInstructorSection from "@/features/CoursePage/CourseInstructorSection/CourseInstructorSection";
import CourseObjectiveSection from "@/features/CoursePage/CourseObjectiveSection/CourseObjectiveSection";
import VideoNotes from "@/features/CoursePage/VideoNotes/VideoNotes";
import {
  useCheckEnrollmentQuery,
  useCourseQuery,
  useViewCourseMutation,
} from "@/services/course.service";
import { useParams } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSelector } from "react-redux";
import { selectedAuthUser } from "@/store";
import "./CoursePreviewPage.css";

const CoursePreviewPage = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const { courseId } = useParams<{ courseId: string }>();
  const { authUser } = useAuthUser();

  const user = useSelector(selectedAuthUser);

  const { data: isUserEnrolled } = useCheckEnrollmentQuery({
    userId: user?.id || "",
    courseId,
  });

  const { data: courseData, isLoading } = useCourseQuery({ id: courseId });
  const [viewCourse] = useViewCourseMutation();

  const videoRef = useRef<VideoPlayerHandle>(null);

  const handleVideoClick = (chapterIndex: number, videoIndex: number) => {
    console.log(`Chapter: ${chapterIndex}, Video: ${videoIndex}`);
    setActiveChapterIndex(chapterIndex);
  };

  useEffect(() => {
    if (courseData) {
      viewCourse(courseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseData]);

  /* 🔹 Spinner Loader */
  if (isLoading) {
    return (
      <div className="course-preview-loader">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="course-preview-page container">
      {/* Top section */}
      <div className="course-preview-page__top-section">
        {/* Left side (Video + Description + Reviews) */}
        <div className="course-preview-page__left-side">
          <VideoPlayer
            ref={videoRef} // ✅ pass ref
            videoUrl={courseData?.chapters[activeChapterIndex]?.videoUrl}
            posterUrl={courseData?.posterUrl}
            watchMode={true}
          />
          <CourseVideoDescription
            description={courseData?.description}
            category={courseData?.category?.name}
          />
          <CourseReviewsSection
            courseId={courseId}
            user={authUser}
            watchMode={false}
          />
        </div>

        {/* Right side (Enroll + Content + Notes) */}
        <div className="course-preview-page__right-side">
          <CourseEnrollSection
            courseId={Number(courseId)}
            courseName={courseData?.title}
            isUserAlreadyEnrolled={isUserEnrolled?.enrolled || false}
            cost={courseData?.price}
            instructorName={courseData?.instructor.name}
            rate={courseData.rating}
            level={courseData?.instructor.level}
            duration={courseData?.duration}
          />
          <CourseContentSection
            courseId={Number(courseId)}
            chapters={courseData?.chapters || []}
            isUserAlreadyEnrolled={isUserEnrolled?.enrolled || false}
            completedChapter={[]}
            handleVideoClick={handleVideoClick}
          />
          {authUser && (
            <VideoNotes
              videoRef={videoRef}
              chapterName={
                courseData?.chapters[activeChapterIndex]?.title || "Chapter"
              }
              courseName={courseData?.title || "Course"}
            />
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="course-preview-page__bottom-section">
        <AcquiredSkillsSection skills={courseData?.skills} />
        <CourseInstructorSection instructor={courseData?.instructor} />
        <CourseObjectiveSection objectives={courseData?.objectives} />
      </div>
    </div>
  );
};

export default CoursePreviewPage;
