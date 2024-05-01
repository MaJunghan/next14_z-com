import style from './profile.module.scss';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getUser } from './_lib/getUser';
import { getUserPosts } from './_lib/getUserPosts';
import UserInfo from './_component/UserInfo';
import UserPosts from './_component/UserPosts';

type Props = {
  params: {
    username: string;
  };
};

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['users', username],
    queryFn: getUser,
  });
  await queryClient.prefetchQuery({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
  });
  const dehydradtedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydradtedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
