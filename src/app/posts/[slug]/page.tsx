import html from 'remark-html'
import { remark } from 'remark'
import { Avatar } from '@/components/Avatar'
import Image from 'next/image'
import styles from './page.module.css'

interface PostProps {
    id: string
    cover: string
    title: string
    body: string
    markdown: string
    author: {
        id: string
        name: string
        username: string
        avatar: string
    }
}

async function getPostBySlug(slug: string) {
    const response = await fetch(`http://localhost:3042/posts?slug=${slug}`)
    if (!response.ok) {
        return {}
    }
    
    const data = await response.json()
    if (!data.length) {
        return {}
    }

    const post: PostProps = data[0]

    const processedContent = await remark().use(html).process(post.markdown)
    const contentHtml = processedContent.toString()
    post.markdown = contentHtml

    return post
}

export default async function PagePost({ params }: any) {
    const post: PostProps = await getPostBySlug(params.slug) as PostProps;
    return (
        <main className={styles.main}>
            <section className={styles.card}> 
                <header className={styles.header}>
                    <Image className={styles.banner} src={post.cover} alt={post.title} width={961} height={300}/>
                </header>
                <section className={styles.content}>
                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.body}>{post.body}</p>
                    <footer className={styles.avatar}>
                        <Avatar authorName={post.author.username} authorAvatar={post.author.avatar}/>
                    </footer>
                </section>
            </section>
            <h2 className={styles.subtitle}>Código</h2>
            <div className={styles.codeBox}>
                <div className={styles.codeText} dangerouslySetInnerHTML={{__html: post.markdown}}/>
            </div>
        </main>
    )
}