'use client';

import { usePathname } from 'next/navigation';
import Trend from './Trend';
import styles from './TrendSection.module.scss';
import { useSession } from 'next-auth/react';

export default function TrendSection() {
  const pathName = usePathname();
  const { data } = useSession();
  if (pathName === '/explore') return null;

  if (data?.user) {
    return (
      <div className={styles.trendBg}>
        <div className={styles.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
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
