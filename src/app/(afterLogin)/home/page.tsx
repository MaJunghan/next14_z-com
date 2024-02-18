import Post from '../_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import styles from './homoe.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Tab />
      <PostForm />
      <Post />
    </main>
  );
}
