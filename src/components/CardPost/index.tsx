import Image from "next/image"
import { Avatar } from "../Avatar"
import styles from "./cardpost.module.css"

interface PostProps {
    banner: string
    title: string
    description: string
    authorName: string
    authorAvatar: string
}

export function CardPost(props: PostProps) {
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
            </section>
            <footer className={styles.footer}>
                <Avatar
                    authorAvatar={props.authorAvatar}
                    authorName={props.authorName}
                />
            </footer>
        </article>
    )
}