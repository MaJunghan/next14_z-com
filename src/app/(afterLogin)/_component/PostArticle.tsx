'use client';
import { ReactNode } from 'react';
import style from './post.module.scss';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
  post: {
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    content: string;
    createdAt: Date;
    Images: any[];
    postId: number;
  };
};

export default function PostArticle({ children, post }: Props) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    <article className={style.post} onClickCapture={onClick}>
      {children}
    </article>
  );
}
