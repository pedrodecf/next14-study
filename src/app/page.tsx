import { CardPost } from "@/components/CardPost";
import styles from './page.module.css'
import Link from "next/link";
import { db } from "../../prisma/db";
import { SearchBar } from "@/components/SearchBar";

async function getAllPosts(page: number, searchTerm?: string) {
  try {
    const perPage = 6
    const totalItems = await db.post.count({
      where: {
        title: {
          contains: searchTerm,
          mode: 'insensitive'
      }
     }
    })
    const totalPages = Math.ceil(totalItems / perPage)
    const skip = (page - 1) * perPage

    const prev = page > 1 ? page - 1 : null
    const next = page < totalPages ? page + 1 : null

    const posts = await db.post.findMany({
      take: perPage,
      skip,
      where: {
        title: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
      include: { author: true }
    })

    return { data: posts, prev, next}
  } catch (error) {
    console.error(error)

    return { data: [], prev: null, next: null}
  }
}

interface HomePageParamsProps {
  searchParams: {
    q: string
    page: string
  }
}

export default async function Home({ searchParams }: HomePageParamsProps) {
  const currentPage = parseInt(searchParams?.page || '1')
  const searchTerm = searchParams?.q
  const { data: posts, prev, next } = await getAllPosts(currentPage, searchTerm)
  return (
    <div className={styles.container}>
      <SearchBar />
      <main className={styles.main}>
        {posts.map((post) => (
          <CardPost
            id={post.id}
            key={post.id}
            banner={post.cover}
            title={post.title}
            description={post.body}
            authorAvatar={post.author.avatar}
            authorName={post.author.username}
            slug={post.slug}
            likes={post.likes}
          />
        ))}
        <div className={styles.divPagination}>
          {prev && <Link className={styles.buttonPagination} href={{pathname: '/', query: { page: prev, q: searchTerm}}}>Página anterior</Link>}
          {next && <Link className={styles.buttonPagination} href={{pathname: '/', query: { page: next, q: searchTerm}}}>Próxima página</Link>}
        </div>
      </main>
    </div>
  );
}
