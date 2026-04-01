"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import CourseContentSection from "@/features/CoursePage/CourseContentSection/CourseContentSection";
import VideoPlayer, {
  VideoPlayerHandle,
} from "@/features/CoursePage/VideoPlayer/VideoPlayer";
import CourseOverviewSection from "@/features/CoursePage/CourseOverviewSection/CourseOverviewSection";
import CourseNotesSection from "@/features/CoursePage/CourseNotesSection/CourseNotesSection";
import CourseQuestions from "@/features/CoursePage/CourseQuestions/CourseQuestions";
import Tabs from "@/components/ui/Tabs/Tabs";
import CourseReviewsSection from "@/features/CoursePage/CourseReviewsSection/CourseReviewsSection";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useCourseQuery } from "@/services/course.service";
import "./WatchCoursePage.css";

interface ActiveVideo {
  chapterIndex: number;
  videoIndex: number | null; // null means intro video
}

const CourseWatchPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<ActiveVideo>({
    chapterIndex: 0,
    videoIndex: null,
  });
  const [currentTimestamp, setCurrentTimestamp] = useState("0:00");
  const videoPlayerRef = useRef<VideoPlayerHandle>(null);
  const { courseId } = useParams<{ courseId: string }>();
  const { authUser } = useAuthUser();
  const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] =
    useState<boolean>(false);

  const { data: courseData, isLoading } = useCourseQuery({ id: courseId });
  const DEFAULT_VIDEO_URL = "/videos/tesssst.mp4";

  useEffect(() => {
    checkUserEnrolledToCourse();
  }, []);

  const checkUserEnrolledToCourse = () => {
    setTimeout(() => {
      const response = { userEnrollCourses: [{ id: 123 }] };
      setIsUserAlreadyEnrolled(response.userEnrollCourses.length > 0);
    }, 1000);
  };

  const handleVideoClick = (chapterIndex: number, videoIndex: number) => {
    setActiveVideo({ chapterIndex, videoIndex });
  };

  const getCurrentVideoUrl = () => {
    if (!courseData) return DEFAULT_VIDEO_URL;

    if (activeVideo.videoIndex === null) {
      return courseData.videoUrl || DEFAULT_VIDEO_URL;
    } else {
      return (
        courseData.chapters[activeVideo.chapterIndex]?.videos[
          activeVideo.videoIndex
        ]?.url || DEFAULT_VIDEO_URL
      );
    }
  };

  const getCurrentVideoId = () => {
    if (activeVideo.videoIndex === null) return null;
    return (
      courseData?.chapters[activeVideo.chapterIndex]?.videos[
        activeVideo.videoIndex
      ]?.id || null
    );
  };

  return (
    <div className="course-watch-page container">
      {/* Left side */}
      <div className="course-watch-page__left-side">
        {!isLoading && courseData && (
          <VideoPlayer
            ref={videoPlayerRef}
            videoUrl={getCurrentVideoUrl()}
            posterUrl={courseData.posterUrl}
            onTimeUpdate={setCurrentTimestamp}
          />
        )}

        <CourseNotesSection
          videoId={getCurrentVideoId()}
          currentTimestamp={currentTimestamp}
        />

        <Tabs>
          <div title="Course Overview">
            <div className="course-watch-page__tab-content">
              <CourseOverviewSection
                title={courseData?.title}
                insturctor={courseData?.instructor || {}}
                skillLevel={"Senior"}
                students={158}
                languages={courseData?.languages}
                captions={courseData?.skillLevel}
                lecturesCount={courseData?.lecturesCount}
                duration={courseData?.duration}
                features={courseData?.features}
                description={courseData?.description}
              />
            </div>
          </div>

          <div title="Review">
            <div className="course-watch-page__tab-content">
              <CourseReviewsSection courseId={courseId} user={authUser} />
            </div>
          </div>

          <div title="Ask Instructor">
            <div className="course-watch-page__tab-content">
              <CourseQuestions courseId={courseId} user={authUser} />
            </div>
          </div>
        </Tabs>
      </div>

      {/* Right side */}
      <div className="course-watch-page__right-side">
        <CourseContentSection
          courseId={Number(courseId)}
          chapters={courseData?.chapters || []}
          watchMode
          isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          handleVideoClick={handleVideoClick}
          completedChapter={[]}
        />
      </div>
    </div>
  );
};

export default CourseWatchPage;
