import Image from 'next/image'
import styles from './error.module.css'
import Link from 'next/link'
import { ArrowBack } from '@/components/icons/ArrowBack'
import error404img from '../../public/404.png'

export default function NotFound() {
    return (
        <div className={styles.container}>
        <Image src={error404img} alt='Robo pensativo' height={367} width={656}/>
        <div className={styles.info}>
          <h2 className={styles.title}>OPS! Página não encontrada.</h2>
          <p className={styles.paragraph}>Você pode voltar ao feed e continuar buscando projetos incríveis!</p>
        </div>
        <Link className={styles.link} href='/'>
          Voltar ao feed <ArrowBack color='#81FE88'/>
        </Link>
      </div>
    )
}