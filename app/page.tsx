import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" border flex flex-col justify-center items-center">
      <div className="flex flex-col gap-y-2 mb-8 text-center">
        <h1 className="text-4xl">Welcome to "minimal classroom"</h1>
        <p className="text-xl">An alternative for Google Classroom</p>
      </div>  
      <Link href='/login'>
        <button className="p-4 rounded-xl bg-blue-500">Get Started</button>
      </Link>
    </main>
  );
}
