import { prisma } from '@/utils/db'; //* @ is given in tsconfig paths
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user!.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user!.id,
        email: user!.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect('/journal');
};
export default async function NewUserPage() {
  await createNewUser();
  return <div>...loading</div>;
}
