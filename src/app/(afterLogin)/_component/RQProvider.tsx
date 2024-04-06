'use client';

import React, { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false, // 브라우저 다른탭으로 이동 후 다시 우리페이지로 돌아온 시점
          retryOnMount: true, // 컴포넌트가 unMount 이후 다시 Mount된 시점
          refetchOnReconnect: false, // 네트워크가 끊켯다가 다시 연결된시점
          retry: false, // 데이터 가져올때 실패하면 재시도 여부
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === 'local'}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
