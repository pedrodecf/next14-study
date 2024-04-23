'use client'

import { useState } from 'react'
import { Button } from '../Button'
import styles from './searchbar.module.css'


export function SearchBar(){
    const [searchValue, setSearchValue] = useState('')

     return (
        <form className={styles.form} action="/">
            <input
                name='q'
                className={styles.input}
                type="text"
                placeholder={`Digite o que você procura`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button disabled={!searchValue}>Buscar</Button>
        </form>
    )
}