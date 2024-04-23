import Image from 'next/image'
import styles from './aside.module.css'
import logo from './logo.png'

export function Aside() {
    return (
        <aside className={styles.aside}>
            <a href="/">
                <Image src={logo} alt='Logo Code Connection'/>
            </a>
        </aside>
    )
}