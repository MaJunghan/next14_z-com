'use client';

import {
  InfiniteData,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import Post from '../../_component/Post';
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from '../homoe.module.scss';

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching, isPending, isError } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      staleTime: 60 * 1000, // fresh -> stale 1분
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    });

  // gcTime은 메모리에 저장될시간 defult 5분
  // gcTIme은 Inactive됬을때 시간이 흘러감, 즉 사용하지 않는 데이터 => 가비지콜렉터에서 제거
  // 설정한 staleTime이 fresh라면 메모리에서 데이터를 가져온다.
  // stale이라면 데이터 fetcing
  // gcTime은 staleTime보다 길어야한다. => 캐싱된 데이터를 가져와야하는데 시간이 짧으면 의미가 없기때문

  const { ref, inView } = useInView({
    // 특정 엘리먼트가 보이고 몇픽셀
    threshold: 0,
    delay: 0,
  });

  if (isPending) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          className={styles.loader}
          height='100%'
          viewBox='0 0 32 32'
          width={40}
        >
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{ stroke: 'rgb(29, 155, 240)', opacity: 0.2 }}
          ></circle>
          <circle
            cx='16'
            cy='16'
            fill='none'
            r='14'
            strokeWidth='4'
            style={{
              stroke: 'rgb(29, 155, 240)',
              strokeDasharray: 80,
              strokeDashoffset: 60,
            }}
          ></circle>
        </svg>
      </div>
    );
  }

  if (isError) {
    return '에러 처리';
  }

  useEffect(() => {
    // 특정 엘리먼트가 보이면 inView => True
    if (inView) {
      // 데이터를 가져 오지 않을때면서 , 다음 페이지가 있을때
      // 다음 페이지는 5페이지씩 계산하여 5의 배수가 되지않으면 다음페이지가 없는 것
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}

// actions
// refetch: 무조건 새로 데이터를 가져옴
// invalidate: observer에서 사용하는 데이터만 가져옴
// reset : 초기데이터로 되돌리고 싶을때 사용, 만약 initialData가 없으면 데이터 새로가져옴
// remove: 제거
// loading : 로딩 상태
// error: 에러 상태
