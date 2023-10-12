'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function NewEntryCard() {
  const router = useRouter();

  const clickHandler = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };

  return (
    <div className="overflow-hidden bg-white rounded-lg shadow cursor-pointer">
      <div className="px-4 py-5 sm:p-6" onClick={clickHandler}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  );
}
