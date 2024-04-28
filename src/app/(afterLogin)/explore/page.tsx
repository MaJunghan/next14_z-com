import TrendSection from './_component/TrendSection';
import styles from './explore.module.scss';
import SearchForm from '@/app/(afterLogin)/_component/SearchForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
