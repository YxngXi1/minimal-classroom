import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function GET() {
  await connectMongoDB();

  try {
    const users = await User.find({}, 'name email role');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'was unable to be able to grab the users from the mongodb datbase using fetch ❌' }, { status: 500 });
  }
}