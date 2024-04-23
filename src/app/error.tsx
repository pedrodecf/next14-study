'use client'
 
import { useEffect } from 'react'

import styles from './error.module.css'
import Image from 'next/image'
import error500img from '../../public/500.png'
import Link from 'next/link'
import { ArrowBack } from '@/components/icons/ArrowBack'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.container}>
      <Image src={error500img} alt='Robo pensativo' height={367} width={656}/>
      <div className={styles.info}>
        <h2 className={styles.title}>Opa! Um erro ocorreu.</h2>
        <p className={styles.paragraph}>Não conseguimos carregar a página, volte para seguir navegando. </p>
      </div>
      <Link className={styles.link} href='/'>
        Voltar ao feed <ArrowBack color='#81FE88'/>
      </Link>
    </div>
  )
}