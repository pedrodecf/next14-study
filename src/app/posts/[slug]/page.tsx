import html from 'remark-html'
import { remark } from 'remark'
import { Avatar } from '@/components/Avatar'
import Image from 'next/image'
import styles from './page.module.css'
import { db } from '../../../../prisma/db'
import { redirect } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'

async function getPostBySlug(slug: string) {

    try {
        const post = await db.post.findFirstOrThrow({
            where: { slug },
            include: { author: true }
        })

        if (!post) {
            throw new Error('Post not found')
        }
    
        const processedContent = await remark().use(html).process(post.markdown)
        const contentHtml = processedContent.toString()
        post.markdown = contentHtml
    
        return post
    } catch (error) {
        console.error(error)
    }

    redirect('/not-found')
}

interface PagePostParamsProps {
    params: {
        slug: string
    }
}

export default async function PagePost({ params }: PagePostParamsProps) {
    const post = await getPostBySlug(params.slug);
    return (
        <main className={styles.main}>
            <SearchBar />
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