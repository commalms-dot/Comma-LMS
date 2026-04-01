import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Mock data - replace with your actual database query
  const mockCourses = [
    {
      id: '1',
      title: 'React Fundamentals',
      thumbnail: '/images/courses/react-fundamentals.jpg',
      slug: 'react-fundamentals'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      thumbnail: '/images/courses/advanced-js.jpg',
      slug: 'advanced-javascript'
    },
    {
      id: '3',
      title: 'TypeScript for React Developers',
      thumbnail: '/images/courses/typescript-react.jpg',
      slug: 'typescript-react'
    },
  ];

  // Filter courses based on query
  const filteredCourses = query 
    ? mockCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return NextResponse.json({ courses: filteredCourses });
}