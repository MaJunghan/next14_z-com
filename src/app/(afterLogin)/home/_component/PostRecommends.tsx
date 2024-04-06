'use client';

import { useQuery } from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/modal/Post';
import { Fragment } from 'react';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale 1분
  });

  // gcTime은 메모리에 저장될시간 defult 5분
  // gcTIme은 Inactive됬을때 시간이 흘러감, 즉 사용하지 않는 데이터 => 가비지콜렉터에서 제거
  // 설정한 staleTime이 fresh라면 메모리에서 데이터를 가져온다.
  // stale이라면 데이터 fetcing

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
