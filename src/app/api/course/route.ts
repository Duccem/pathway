import { saveCourse } from '@/modules/Course/presentation/actions/save-course';
import { searchCourses } from '@/modules/Course/presentation/actions/search-courses';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const values = await req.json();
    await saveCourse({ ...values, userId });
    return NextResponse.json({ message: 'Course created' }, { status: 201 });
  } catch (error) {
    console.log('[COURSE_POST]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    const search = req.nextUrl.searchParams.get('search');
    const courses = await searchCourses(search ? search : '', userId);
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.log('[COURSE_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
