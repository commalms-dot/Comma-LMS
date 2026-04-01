// components/User/EnrollmentsDropdown/EnrollmentsDropdown.tsx
import Link from "next/link";
import Image from "next/image";
import styles from "./EnrollmentsDropdown.module.css";
import { Enrollment } from "@/types/enrollment";

interface EnrollmentsDropdownProps {
  enrollments: Enrollment[];
  onClose: () => void;
  userName: string;
}

const EnrollmentsDropdown: React.FC<EnrollmentsDropdownProps> = ({
  enrollments,
  onClose,
  userName,
}) => {
  // Dummy data for now - replace with API data later
  const dummyEnrollments: Enrollment[] = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 75,
      image: "/images/courses/react.jpg",
      lastAccessed: "2 days ago",
      instructor: "Sarah Johnson",
      category: "Web Development",
    },
    {
      id: 2,
      title: "UX/UI Design Masterclass",
      progress: 42,
      image: "/images/courses/design.jpg",
      lastAccessed: "1 week ago",
      instructor: "Michael Chen",
      category: "Design",
    },
    {
      id: 3,
      title: "Node.js Backend Programming",
      progress: 20,
      image: "/images/courses/nodejs.jpg",
      lastAccessed: "3 days ago",
      instructor: "Alex Rodriguez",
      category: "Backend Development",
    },
  ];

  const userEnrollments =
    enrollments.length > 0 ? enrollments : dummyEnrollments;

  return (
    <div className={styles.dropdown}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <h3>Hello, {userName}</h3>
          <p>Continue your learning journey</p>
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close dropdown"
        >
          &times;
        </button>
      </div>

      <div className={styles.enrollmentsList}>
        <h4 className={styles.sectionTitle}>Recent Enrollments</h4>
        {userEnrollments.slice(0, 3).map((enrollment) => (
          <Link
            key={enrollment.id}
            href={`/courses/${enrollment.id}`}
            className={styles.enrollmentItem}
            onClick={onClose}
          >
            <div className={styles.courseImage}>
              <Image
                src={enrollment.image}
                alt={enrollment.title}
                width={60}
                height={60}
                className={styles.image}
              />
            </div>
            <div className={styles.courseInfo}>
              <h4 className={styles.courseTitle}>{enrollment.title}</h4>
              <p className={styles.courseInstructor}>
                by {enrollment.instructor}
              </p>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${enrollment.progress}%` }}
                  ></div>
                </div>
                <span className={styles.progressText}>
                  {enrollment.progress}% complete
                </span>
              </div>
              <p className={styles.lastAccessed}>
                Last accessed: {enrollment.lastAccessed}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <Link
          href="/enrollments"
          className={styles.viewAllBtn}
          onClick={onClose}
        >
          View All Enrollments
        </Link>
      </div>
    </div>
  );
};

export default EnrollmentsDropdown;
