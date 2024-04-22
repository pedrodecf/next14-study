import Image from "next/image"
import styles from "./avatar.module.css"

interface AvatarProps {
    authorName: string
    authorAvatar: string
}

export function Avatar(props: AvatarProps){
    return (
        <ul className={styles.avatarContainer}>
            <li>
                <Image
                    src={props.authorAvatar}
                    alt={`Imagem avatar do(a) ${props.authorName}`}
                    width={32}
                    height={32}
                />
            </li>
            <li>@{props.authorName}</li>
        </ul>
    )
}