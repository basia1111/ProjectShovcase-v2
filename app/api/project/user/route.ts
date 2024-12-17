import { NextResponse } from 'next/server';
import { auth } from '@auth';
import connectDB from '@lib/db';
import { findUserProjects } from '@lib/user/findUserProjects';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();

  try {
    const userProjects = await findUserProjects(session.user.id);

    return NextResponse.json(
      {
        projects: userProjects,
        message: userProjects?.length === 0 ? 'You do not have any projects yet' : undefined,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Project fetch error:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}
