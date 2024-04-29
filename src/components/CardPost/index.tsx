import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from "./cardpost.module.css"
import Link from "next/link"
import { incrementThumbsUp } from "@/actions"
import { ThumbsUpButton } from "./ThumbsUpButton"

interface PostProps {
    id: number
    banner: string
    title: string
    description: string
    authorName: string
    authorAvatar: string
    slug: string
    likes: number
}

export function CardPost(props: PostProps) {
    const submitThumbsUp = incrementThumbsUp.bind(null, props.id)
    return (
            <article className={styles.card}> 
                <header className={styles.header}>
                    <figure>
                        <Image
                            className={styles.banner}
                            src={props.banner}
                            alt={`Capa do post de título ${props.title}`}
                            width={438}
                            height={133}
                        />
                    </figure>
                </header>
                <section className={styles.section}>
                    <h2 className={styles.title}>{props.title}</h2>
                    <p className={styles.description}>{props.description}</p>
                    <Link href={`/posts/${props.slug}`} className={styles.link}>Ver detalhes</Link>
                </section>
                <footer className={styles.footer}>
                    <div>
                        <form action={submitThumbsUp}>
                            <ThumbsUpButton />
                        </form>
                        <p>{props.likes}</p>
                    </div>
                    <Avatar
                        authorAvatar={props.authorAvatar}
                        authorName={props.authorName}
                    />
                </footer>
            </article>
    )
}