import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import styles from './homoe.module.scss';
import Post from '../_component/Post';

export default function Home() {
  return (
    <main className={styles.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}
