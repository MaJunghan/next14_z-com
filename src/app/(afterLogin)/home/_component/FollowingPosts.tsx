'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment } from 'react';

export default function PostRecommends() {
  // isPending으로 처리가 가능하나 이렇게된다면 서버컴포넌트와 클라이언트 컴포넌트의 로딩상태마다 해당 isPending을 처리해줘야하는 번거로움 발생
  // useSuspenseQuery를 쓰면 서버컴포넌트의 loading.tsx로 처리가 가능함. error도 마찬가지
  const { data, isPending } = useSuspenseQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale 1분
  });

  // if (isPending) {
  //   return (
  //     <div style={{ display: 'flex', justifyContent: 'center' }}>
  //       <svg
  //         className={styles.loader}
  //         height='100%'
  //         viewBox='0 0 32 32'
  //         width={40}
  //       >
  //         <circle
  //           cx='16'
  //           cy='16'
  //           fill='none'
  //           r='14'
  //           strokeWidth='4'
  //           style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}
  //         ></circle>
  //         <circle
  //           cx='16'
  //           cy='16'
  //           fill='none'
  //           r='14'
  //           strokeWidth='4'
  //           style={{
  //             stroke: 'rgb(29, 155, 240)',
  //             strokeDasharray: 80,
  //             strokeDashoffset: 60,
  //           }}
  //         ></circle>
  //       </svg>
  //     </div>
  //   );
  // }

  return (
    <>
      {data?.map((post: IPost) => (
        <Fragment key={post.postId}>
          <Post post={post} />
        </Fragment>
      ))}
    </>
  );
}
