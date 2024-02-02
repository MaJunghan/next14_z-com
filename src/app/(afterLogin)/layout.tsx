import { ReactNode } from 'react';
import styles from '@/app/(afterLogin)/layout.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ZLogo from '@/../public/zlogo.png';

export default function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}>
          <div className={styles.leftSectionFixed}>
            <Link className={styles.logo} href='/home'>
              <div className={styles.logoPill}>
                <Image src={ZLogo} alt='z.com로고' width={40} height={40} />
              </div>
            </Link>
          </div>
        </section>
      </header>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          <main className={styles.main}>{children}</main>
          <section className={styles.rightSection} />
        </div>
      </div>
    </div>
  );
}
