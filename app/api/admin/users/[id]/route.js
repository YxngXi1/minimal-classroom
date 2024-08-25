import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function PUT(request, { params }) {
  await connectMongoDB();
  const { id } = params;
  const { role } = await request.json();

  if (!role || !['student', 'teacher'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  }
}