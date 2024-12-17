import { auth } from '@auth';
import connectDB from '@lib/db';
import Project from '@models/Project';
import { NextResponse, NextRequest } from 'next/server';

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'unauthorised, no session' }, { status: 401 });
  }
  const url = new URL(request.url);
  const projectId = url.pathname.split('/').pop();

  await connectDB();

  const project = await Project.findById(projectId);

  if (!project) {
    return NextResponse.json({ message: 'project not found' }, { status: 400 });
  } else if (project.author.toString() !== session.user.id) {
    return NextResponse.json(
      {
        message: `unauthorised, tahts not your project, project author: ${project}, session user: ${session.user.id}`,
      },
      { status: 401 },
    );
  }

  try {
    await Project.findByIdAndDelete(projectId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `catch error: ${error}` }, { status: 500 });
  }
}
