export interface Enrollment {
  id: number;
  title: string;
  progress: number; // 0-100
  image: string;
  lastAccessed: string;
  instructor: string;
  category: string;
}
