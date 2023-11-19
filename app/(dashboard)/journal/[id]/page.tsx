import Editor from '@/components/Editor';
import { analyze } from '@/utils/ai';
import { getUserByClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id) => {
  const user = await getUserByClerkID();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      //? look at combined index in journalentry schema for why its like this
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  return entry;
};

export default async function EntryPage({ params }) {
  const entry = await getEntry(params.id);

  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: 'False' },
  ];

  return (
    <div className="grid w-full h-full grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="px-4 py-10 bg-blue-300">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="flex items-center justify-between px-2 py-4 border-t border-b border-black/10"
                key={item.name}
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
