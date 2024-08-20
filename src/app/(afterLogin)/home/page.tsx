import style from './homoe.module.scss';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import { Suspense } from 'react';
import Loading from '@/app/(afterLogin)/home/loading';
import TabDeciderSuspense from '@/app/(afterLogin)/home/_component/TabDeciderSuspense';
import { auth } from '@/auth';

export default async function Home() {
  const sesstion = await auth()

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={sesstion}/>
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
