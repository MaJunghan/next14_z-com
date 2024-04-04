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
