import Main from '@/app/(beforeLogin)/_component/Main';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const sesstion = await auth();

  if (sesstion?.user) {
    redirect('/home');
  }
  return <Main />;
}
