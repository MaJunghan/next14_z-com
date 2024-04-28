'use client';

import { usePathname } from 'next/navigation';
import Trend from './Trend';
import styles from './TrendSection.module.scss';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '../_lib/getTrends';
import { Hashtag as IHashtag } from '@/model/Hashtag';

export default function TrendSection() {
  const { data: session } = useSession();
  const { data } = useQuery<IHashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    enabled: !!session?.user, // 로그인한 사용자가 있을때만 데이터를 가져온다.
  });

  const pathName = usePathname();

  if (pathName === '/explore') return null;

  if (session?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.trendBg}>
      <div className={styles.noTrend}>트렌드를 가져올 수 없습니다.</div>
    </div>
  );
}
