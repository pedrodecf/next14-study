import { CardPost } from "@/components/CardPost";
import logger from "@/logger";
import styles from './page.module.css'

const post = {
  "id": 1,
      "cover": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/posts/introducao-ao-react.png",
      "title": "Introdução ao React",
      "slug": "introducao-ao-react",
      "body": "Neste post, vamos explorar os conceitos básicos do React, uma biblioteca JavaScript para construir interfaces de usuário. Vamos cobrir componentes, JSX e estados.",
      "markdown": "```javascript\nfunction HelloComponent() {\n  return <h1>Hello, world!</h1>;\n}\n```",
      "author": {
        "id": 101,
        "name": "Ana Beatriz",
        "username": "anabeatriz_dev",
        "avatar": "https://raw.githubusercontent.com/viniciosneves/code-connect-assets/main/authors/anabeatriz_dev.png"
      }
}

async function getAllPosts(page: number) {
  const response = await fetch(`http://localhost:3042/posts?_page=${page}&_per_page=6`)

  if (!response.ok) {
    logger.error('Erro ao buscar posts')
    return []
  }

  logger.info('Posts carregados com sucesso')
  return response.json()
}

interface Post {
  id: number;
  cover: string;
  title: string;
  slug: string;
  body: string;
  markdown: string;
  author: {
    id: number;
    name: string;
    username: string;
    avatar: string;
  };
}

export default async function Home() {
  const { data: posts } = await getAllPosts(1)
  return (
    <main className={styles.main}>
      {posts.map((post: Post) => (
        <CardPost
          key={post.id}
          banner={post.cover}
          title={post.title}
          description={post.body}
          authorAvatar={post.author.avatar}
          authorName={post.author.username}
        />
      ))}
    </main>
  );
}
