"use client";

import Collapsible from "@/components/Collapsible/Collapsible";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Chapter } from "@/types/Course";
import "./CourseContentSection.css";
import { formatDuration } from "@/utils/formatDuration";
import { useAuthStore } from "@/store/authStore";

interface CompletedChapter {
  chapterId: number;
}

interface CourseContentSectionProps {
  courseId: number;
  chapters?: Chapter[];
  isUserAlreadyEnrolled: boolean;
  watchMode?: boolean;
  handleVideoClick: (chapterIndex: number, videoIndex: number) => void;
  completedChapter: CompletedChapter[];
}

function CourseContentSection({
  courseId,
  chapters: chaptersFromProps,
  watchMode = false,
  handleVideoClick,
}: CourseContentSectionProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuthStore();

  useEffect(() => {
    if (chaptersFromProps && chaptersFromProps.length > 0) {
      setChapters(chaptersFromProps);
      setLoading(false);
      return;
    }

    if (!token || !courseId) {
      setLoading(false); // make sure we stop spinner
      return;
    }

    const fetchCourse = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${courseId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch course data");

        const data = await response.json();

        const mappedChapters: Chapter[] = (data.chapters ?? []).map(
          (chapter: any) => ({
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            videos: chapter.videos ?? [],
          })
        );

        setChapters(mappedChapters);
      } catch (err) {
        console.error(err);
        setError("Could not load course content");
      } finally {
        setLoading(false); // ✅ stop spinner even if no chapters or error
      }
    };

    fetchCourse();
  }, [courseId, token, chaptersFromProps]);

  if (loading) {
    return (
      <div className="course-content-section">
        <div className="course-content-section__header">
          <p>Course content</p>
        </div>

        <div className="course-content-section__loader">
          <span className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="course-content-section__empty">{error}</div>;
  }

  return (
    <div className="course-content-section">
      <div className="course-content-section__header">
        <p>Course content</p>
      </div>

      <div className="course-content-section__chapters-list">
        {chapters.length === 0 ? (
          <div className="course-content-section__empty">
            No chapters in this course
          </div>
        ) : (
          chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="course-content-section__chapter-item"
            >
              <Collapsible
                title={`Chapter ${chapterIndex + 1}: ${chapter.title}`}
              >
                <p className="chapter-description">{chapter.description}</p>

                <div className="course-content-section__content">
                  {(chapter.videos ?? []).map((video, videoIndex) => (
                    <div
                      key={video.id}
                      className="course-content-section__content-item"
                      onClick={() => {
                        if (watchMode) {
                          handleVideoClick(chapterIndex, videoIndex);
                        }
                      }}
                    >
                      <span>
                        {videoIndex + 1}. {video.title}
                      </span>

                      <span className="course-chapter-item__duration">
                        <i>
                          {watchMode ? (
                            <Image
                              src="/svg/play.svg"
                              alt="Play icon"
                              width={30}
                              height={30}
                              priority
                            />
                          ) : (
                            <Image
                              src="/svg/play-locked.svg"
                              alt="Locked icon"
                              width={30}
                              height={30}
                              priority
                            />
                          )}
                        </i>
                        {formatDuration(video.duration)}
                      </span>
                    </div>
                  ))}
                </div>
              </Collapsible>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CourseContentSection;
