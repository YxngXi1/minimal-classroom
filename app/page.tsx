import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <h1>Welcome to "minimal classroom"</h1>
      <p>An alternative for Google Classroom</p>
      <Link href='/login'>
        <button className="p-4 rounded-xl bg-blue-500">Get Started</button>
      </Link>
    </main>
  );
}
