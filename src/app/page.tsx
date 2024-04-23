import { CardPost } from "@/components/CardPost";
import styles from './page.module.css'
import Link from "next/link";
import { db } from "../../prisma/db";
import { SearchBar } from "@/components/SearchBar";

async function getAllPosts(page: number) {
  try {
    const perPage = 6
    const totalItems = await db.post.count()
    const totalPages = Math.ceil(totalItems / perPage)
    const skip = (page - 1) * perPage

    const prev = page > 1 ? page - 1 : null
    const next = page < totalPages ? page + 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    })

    return { data: posts, prev, next}
  } catch (error) {
    console.error(error)

    return { data: [], prev: null, next: null}
  }
}

export default async function Home({ searchParams }: any) {
  const currentPage = parseInt(searchParams?.page || 1)
  const { data: posts, prev, next } = await getAllPosts(currentPage)
  return (
    <div className={styles.container}>
      <SearchBar />
      <main className={styles.main}>
        {posts.map((post) => (
          <CardPost
            key={post.id}
            banner={post.cover}
            title={post.title}
            description={post.body}
            authorAvatar={post.author.avatar}
            authorName={post.author.username}
            slug={post.slug}
          />
        ))}
        <div className={styles.divPagination}>
          {prev && <Link className={styles.buttonPagination} href={`/?page=${prev}`}>Página anterior</Link>}
          {next && <Link className={styles.buttonPagination} href={`/?page=${next}`}>Próxima página</Link>}
        </div>
      </main>
    </div>
  );
}
