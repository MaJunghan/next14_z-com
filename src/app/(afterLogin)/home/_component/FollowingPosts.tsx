'use client';

import { useQuery } from '@tanstack/react-query';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import Post from '../../_component/Post';
import { Post as IPost } from '@/modal/Post';
import { Fragment } from 'react';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale 1분
  });

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
