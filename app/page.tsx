import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/journal' : '/new-user';

  return (
    <div className="flex items-center justify-center w-screen h-screen text-white bg-black">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="mb-4 text-6xl">Mood Journal</h1>
        <p className="mb-4 text-2xl text-white/75">
          Keep track of your mood with this journal
        </p>
        <div>
          <Link href={href}>
            <button className="px-4 py-2 text-xl bg-blue-600 rounded-lg">
              Get Started!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
