import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/authOptions';
import User from '@/models/user';
import { connectMongoDB } from '@/lib/mongodb';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { email } = session.user;
  const { name } = await req.json();

  try {
    await connectMongoDB();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: { name } },
      { new: true }
    );

    if (updatedUser) {
      return NextResponse.json({ message: 'name update v1.12903 complete. ✅' });
    } else {
      return NextResponse.json({ error: 'no user??? 🤯' }, { status: 404 });
    }
  } catch (error) {
    console.error('❌ Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user ❌' }, { status: 500 });
  }
}