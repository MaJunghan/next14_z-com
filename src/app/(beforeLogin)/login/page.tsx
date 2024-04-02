'use client';

import { useRouter } from 'next/navigation';
import Main from '@/app/(beforeLogin)/_component/Main';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.replace('/home');
    }

    router.replace('/i/flow/login');
  }, []);
  return <Main />;
}
